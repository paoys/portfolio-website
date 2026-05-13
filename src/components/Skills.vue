<script setup>
import { SKILL_CATEGORIES } from '@/data/portfolio'

defineProps({
    skillCategories: {
        type: Array,
        default: () => SKILL_CATEGORIES,
    },
})
</script>

<template>
    <section id="skills" class="section section--alt">
        <div class="container">
            <p class="section-label">Skills</p>
            <h2 class="section-title">Tech stack.</h2>
            <p class="section-subtitle">A curated set of languages, frameworks, and tools I work with daily.</p>

            <div class="skills__grid">
                <div class="skill-card reveal" v-for="category in skillCategories" :key="category.title">
                    <p class="skill-card__title">{{ category.title }}</p>
                    <div class="skill-card__tags">
                        <span class="skill-tag" v-for="skill in category.skills" :key="skill">{{ skill }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
