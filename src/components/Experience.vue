<script setup>
import { EXPERIENCE } from '@/data/portfolio'

defineProps({
    experience: {
        type: Array,
        default: () => EXPERIENCE,
    },
})
</script>

<template>
    <section id="experience" class="section">
        <div class="container">
            <p class="section-label">Experience</p>
            <h2 class="section-title">Where I've worked.</h2>
            <p class="section-subtitle">Professional experience building and scaling real-world systems.</p>

            <ol class="timeline" role="list">
                <li class="timeline__item reveal" v-for="job in experience" :key="job.company">
                    <div class="timeline__dot" aria-hidden="true"></div>

                    <div class="timeline__meta">
                        <span class="timeline__period">{{ job.period }}</span>
                        <span class="timeline__badge" :class="{ 'timeline__badge--current': job.current }">
                            {{ job.current ? 'Current' : 'Internship' }}
                        </span>
                    </div>

                    <h3 class="timeline__role">{{ job.role }}</h3>
                    <p class="timeline__company">{{ job.company }} · {{ job.location }}</p>

                    <ul class="timeline__bullets" role="list">
                        <li class="timeline__bullet" v-for="(bullet, idx) in job.bullets" :key="idx">{{ bullet }}</li>
                    </ul>
                </li>
            </ol>
        </div>
    </section>
</template>
