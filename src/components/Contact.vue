<script setup>
import { ref } from 'vue'
import { CONTACT_LINKS } from '@/data/portfolio'

const contactForm = ref({ name: '', email: '', message: '' })
const isFormSubmitted = ref(false)

const handleFormSubmit = () => {
    if (isFormSubmitted.value) return

    // Simulate async submission (replace with real API call)
    setTimeout(() => {
        isFormSubmitted.value = true
        contactForm.value = { name: '', email: '', message: '' }
        setTimeout(() => {
            isFormSubmitted.value = false
        }, 3000)
    }, 400)
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
                                placeholder="Your name" required autocomplete="name" />
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="contact-email">Email</label>
                            <input id="contact-email" v-model="contactForm.email" class="form-input" type="email"
                                placeholder="your@email.com" required autocomplete="email" />
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="contact-message">Message</label>
                            <textarea id="contact-message" v-model="contactForm.message" class="form-textarea"
                                placeholder="What's on your mind?" required></textarea>
                        </div>
                        <button type="submit" class="btn btn--primary" :disabled="isFormSubmitted">
                            {{ isFormSubmitted ? 'Message Sent ✓' : 'Send Message' }}
                            <svg v-if="!isFormSubmitted" width="16" height="16" viewBox="0 0 16 16" fill="none"
                                aria-hidden="true">
                                <path d="M2 8l10-5-5 10V9L2 8z" stroke="currentColor" stroke-width="1.5"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>
                        <p v-if="isFormSubmitted" class="form-success" role="status">
                            Thanks for reaching out! I'll get back to you soon.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
