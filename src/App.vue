<script setup>
import { onMounted } from 'vue'
import AppLayout from './components/AppLayout.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Experience from './components/Experience.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import { STATS, CERTIFICATIONS, SKILL_CATEGORIES, EXPERIENCE as EXP_DATA, PROJECTS as PROJ_DATA } from './data/portfolio'

onMounted(() => {
  // Initialize reveal observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 }
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<template>
  <AppLayout>
    <Hero />
    <div class="divider" role="separator"></div>

    <About :stats="STATS" :certifications="CERTIFICATIONS" />
    <div class="divider" role="separator"></div>

    <Skills :skill-categories="SKILL_CATEGORIES" />
    <div class="divider" role="separator"></div>

    <Experience :experience="EXP_DATA" />
    <div class="divider" role="separator"></div>

    <Projects :projects="PROJ_DATA" />

    <Contact />
    <Footer />
  </AppLayout>
</template>
