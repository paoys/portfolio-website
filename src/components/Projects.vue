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
                        <div class="project-card__logo-wrapper">
                            <img :src="project.logo" :alt="project.name" class="project-card__logo" />
                        </div>
                        <div class="project-card__actions">
                            <a :href="project.live" class="project-card__action project-card__action--live"
                                aria-label="View live project" target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" aria-hidden="true">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                                <span>View</span>
                            </a>
                        </div>
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
