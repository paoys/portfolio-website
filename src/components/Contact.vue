<script setup>
import { ref } from 'vue'
import { CONTACT_LINKS } from '@/data/portfolio'

const contactForm = ref({ name: '', email: '', message: '' })
const isFormSubmitted = ref(false)
const isFormLoading = ref(false)
const formError = ref('')

// Rate limiting configuration
const COOLDOWN_SECONDS = 60 // Wait 60 seconds between submissions
const MAX_MESSAGES_PER_24H = 5 // Max 5 messages per 24 hours
const STORAGE_KEY = 'contact_form_submissions'

// Get submission history from localStorage
const getSubmissionHistory = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    try {
        return JSON.parse(stored)
    } catch {
        return []
    }
}

// Save submission to history
const saveSubmission = () => {
    const history = getSubmissionHistory()
    history.push(Date.now())
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

// Clean up old submissions older than 24 hours
const cleanupOldSubmissions = () => {
    const history = getSubmissionHistory()
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
    const filtered = history.filter(timestamp => timestamp > oneDayAgo)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return filtered
}

// Check if user can submit based on rate limits
const checkRateLimit = () => {
    const history = cleanupOldSubmissions()
    const now = Date.now()

    // Check cooldown (60 seconds between submissions)
    if (history.length > 0) {
        const lastSubmission = history[history.length - 1]
        const secondsElapsed = (now - lastSubmission) / 1000
        if (secondsElapsed < COOLDOWN_SECONDS) {
            const remaining = Math.ceil(COOLDOWN_SECONDS - secondsElapsed)
            formError.value = `Please wait ${remaining} second${remaining !== 1 ? 's' : ''} before sending another message.`
            return false
        }
    }

    // Check daily limit (5 messages per 24 hours)
    if (history.length >= MAX_MESSAGES_PER_24H) {
        formError.value = `You've reached the limit of ${MAX_MESSAGES_PER_24H} messages per 24 hours. Please try again later.`
        return false
    }

    return true
}

const validateForm = () => {
    const { name, email, message } = contactForm.value

    if (!name.trim()) {
        formError.value = 'Name is required'
        return false
    }
    if (!email.trim()) {
        formError.value = 'Email is required'
        return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        formError.value = 'Please enter a valid email'
        return false
    }
    if (!message.trim() || message.trim().length < 10) {
        formError.value = 'Message must be at least 10 characters'
        return false
    }
    formError.value = ''
    return true
}

const handleFormSubmit = async () => {
    if (isFormSubmitted.value || isFormLoading.value) return
    if (!validateForm()) return
    if (!checkRateLimit()) return

    isFormLoading.value = true

    try {
        // Call your Vercel serverless function
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: contactForm.value.name,
                email: contactForm.value.email,
                message: contactForm.value.message
            })
        })

        const data = await response.json()

        if (response.ok) {
            saveSubmission() // Record successful submission
            isFormSubmitted.value = true
            contactForm.value = { name: '', email: '', message: '' }
            formError.value = ''

            // Reset success state after 5 seconds
            setTimeout(() => {
                isFormSubmitted.value = false
            }, 5000)
        } else {
            formError.value = data.error || 'Failed to send message. Please try again.'
        }
    } catch (error) {
        console.error('Form submission error:', error)
        formError.value = 'An error occurred. Please try again later.'
    } finally {
        isFormLoading.value = false
    }
}
</script>

<template>
    <section id="contact" class="section section--alt">
        <div class="container">
            <div class="contact__grid">
                <div>
                    <p class="section-label">Contact</p>
                    <h2 class="section-title">Let's connect.</h2>
                    <p class="contact__intro">
                        I'm always open to new opportunities, interesting projects, or just a good conversation about
                        tech.
                    </p>

                    <ul class="contact__links" role="list">
                        <li v-for="item in CONTACT_LINKS" :key="item.label">
                            <component :is="item.href ? 'a' : 'div'" :href="item.href || undefined"
                                :target="item.external ? '_blank' : undefined"
                                :rel="item.external ? 'noopener noreferrer' : undefined" class="contact-link reveal"
                                :style="!item.href ? { cursor: 'default' } : {}">
                                <div class="contact-link__icon" aria-hidden="true" v-html="item.icon"></div>
                                <div class="contact-link__body">
                                    <p class="contact-link__label">{{ item.label }}</p>
                                    <p class="contact-link__value">{{ item.value }}</p>
                                </div>
                                <svg v-if="item.href" class="contact-link__arrow" width="16" height="16"
                                    viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </component>
                        </li>
                    </ul>
                </div>

                <div>
                    <p class="section-label">Send a message</p>
                    <form class="contact-form" @submit.prevent="handleFormSubmit" novalidate>
                        <div class="form-group">
                            <label class="form-label" for="contact-name">Name</label>
                            <input id="contact-name" v-model="contactForm.name" class="form-input" type="text"
                                placeholder="Your name" required autocomplete="name" :disabled="isFormLoading" />
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="contact-email">Email</label>
                            <input id="contact-email" v-model="contactForm.email" class="form-input" type="email"
                                placeholder="your@email.com" required autocomplete="email" :disabled="isFormLoading" />
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="contact-message">Message</label>
                            <textarea id="contact-message" v-model="contactForm.message" class="form-textarea"
                                placeholder="What's on your mind?" required :disabled="isFormLoading"></textarea>
                        </div>
                        <button type="submit" class="btn btn--primary" :disabled="isFormSubmitted || isFormLoading">
                            {{ isFormSubmitted ? 'Message Sent ✓' : isFormLoading ? 'Sending...' : 'Send Message' }}
                            <svg v-if="!isFormSubmitted && !isFormLoading" width="16" height="16" viewBox="0 0 16 16"
                                fill="none" aria-hidden="true">
                                <path d="M2 8l10-5-5 10V9L2 8z" stroke="currentColor" stroke-width="1.5"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>
                        <p v-if="formError" class="form-error" role="alert">
                            {{ formError }}
                        </p>
                        <p v-if="isFormSubmitted" class="form-success" role="status">
                            Thanks for reaching out! I'll get back to you soon.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
