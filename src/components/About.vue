<script setup>
import { ref } from 'vue'
import { STATS, CERTIFICATIONS } from '@/data/portfolio'
import PdfModal from './PdfModal.vue'

defineProps({
    stats: {
        type: Array,
        default: () => STATS,
    },
    certifications: {
        type: Array,
        default: () => CERTIFICATIONS,
    },
})

const activeCert = ref(null)

function openCert(cert) {
    activeCert.value = cert
}

function closeCert() {
    activeCert.value = null
}
</script>

<template>
    <section id="about" class="section">
        <div class="container">
            <div class="about__grid">
                <div>
                    <p class="section-label">About</p>
                    <h2 class="section-title">Builder at heart.</h2>
                    <div class="about__stats">
                        <div class="stat-card reveal" v-for="stat in stats" :key="stat.label">
                            <div class="stat-card__number">{{ stat.value }}</div>
                            <div class="stat-card__label">{{ stat.label }}</div>
                        </div>
                    </div>
                </div>

                <div class="about__body">
                    <p class="about__text">
                        I'm a detail-oriented Web Developer based in Rizal, Philippines, specializing in
                        full-stack web development. I focus on building reliable, scalable systems that solve real
                        operational challenges.
                    </p>
                    <p class="about__text">
                        Currently at <strong>Wilcon Depot Inc.</strong>, I design and develop internal business systems
                        — from incentive management to coupon platforms and tenant systems — engineered with automation,
                        approval workflows, and clean data handling at their core.
                    </p>
                    <p class="about__text">
                        I hold a <strong>B.S. in Information Technology</strong> from STI College Balagtas, where I
                        graduated Cum Laude.
                    </p>

                    <p class="section-label" style="margin-top: 36px;">Certifications</p>
                    <ul class="cert-list" role="list">
                        <li class="cert-item cert-item--clickable reveal" v-for="cert in certifications"
                            :key="cert.label" @click="openCert(cert)" role="button" tabindex="0"
                            :aria-label="`View ${cert.label} certificate`" @keydown.enter="openCert(cert)"
                            @keydown.space.prevent="openCert(cert)">
                            <span class="cert-item__icon" aria-hidden="true">✦</span>
                            <span class="cert-item__label">{{ cert.label }}</span>
                            <span class="cert-item__arrow" aria-hidden="true">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- PDF Modal for Certificate Preview -->
    <PdfModal :is-open="!!activeCert" :title="activeCert?.label || ''" :pdf-path="activeCert?.pdf || ''"
        :aria-label="`Certificate: ${activeCert?.label || ''}`" icon="✦" @close="closeCert" />
</template>
