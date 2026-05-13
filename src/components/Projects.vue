<script setup>
import { PROJECTS } from '@/data/portfolio'

defineProps({
    projects: {
        type: Array,
        default: () => PROJECTS,
    },
})
</script>

<template>
    <section id="projects" class="section section--alt">
        <div class="container">
            <p class="section-label">Projects</p>
            <h2 class="section-title">Featured work.</h2>
            <p class="section-subtitle">A selection of systems I've designed and built in production environments.</p>

            <div class="projects__grid">
                <article class="project-card reveal" v-for="project in projects" :key="project.name">
                    <div class="project-card__header">
                        <span class="project-card__icon">{{ project.emoji }}</span>
                        <a href="javascript:void(0)" class="project-card__action" aria-label="Project link">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M3 13h10M13 3v10H3" stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                    </div>

                    <h3 class="project-card__name">{{ project.name }}</h3>
                    <p class="project-card__description">{{ project.description }}</p>

                    <div class="project-card__stack">
                        <span class="stack-tag" v-for="tech in project.stack" :key="tech">{{ tech }}</span>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>
