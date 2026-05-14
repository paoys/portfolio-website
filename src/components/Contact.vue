<script setup>
import { ref } from 'vue'
import { CONTACT_LINKS } from '@/data/portfolio'

const contactForm = ref({ name: '', email: '', message: '' })
const isFormSubmitted = ref(false)
const isFormLoading = ref(false)
const formError = ref('')

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

    isFormLoading.value = true

    try {
        // Send email using a service like Formspree, EmailJS, or your own backend
        const response = await fetch('https://formspree.io/f/mnjwyljj', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: contactForm.value.name,
                email: contactForm.value.email,
                message: contactForm.value.message,
                _subject: `New message from ${contactForm.value.name}`
            })
        })

        if (response.ok) {
            isFormSubmitted.value = true
            contactForm.value = { name: '', email: '', message: '' }
            formError.value = ''

            // Reset success state after 5 seconds
            setTimeout(() => {
                isFormSubmitted.value = false
            }, 5000)
        } else {
            formError.value = 'Failed to send message. Please try again.'
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
