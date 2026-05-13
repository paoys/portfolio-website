<script setup>
import { STATS, CERTIFICATIONS } from '@/data/portfolio'

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
                        <li class="cert-item reveal" v-for="cert in certifications" :key="cert">
                            <span class="cert-item__icon" aria-hidden="true">✦</span>
                            {{ cert }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>
