<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NAV_LINKS } from '@/data/portfolio'
import resumeFile from '/resume/Jaspher_Paoyo_Resume.pdf'
import PdfModal from './PdfModal.vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const scrollProgress = ref(0)
const theme = ref(localStorage.getItem('theme') || 'light')
const showResumeModal = ref(false)
const resumePath = resumeFile

const currentYear = computed(() => new Date().getFullYear())

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    document.documentElement.setAttribute('data-theme', theme.value)
}

const applyTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value)
}

const onScroll = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    isScrolled.value = scrollTop > 60
}

const scrollToSection = (id) => {
    isMobileMenuOpen.value = false
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const openResume = () => {
    isMobileMenuOpen.value = false
    showResumeModal.value = true
}

const closeResume = () => {
    showResumeModal.value = false
}

onMounted(() => {
    applyTheme()
    window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
})
</script>

<template>
    <div class="app" :data-theme="theme">
        <!-- Scroll Progress Bar -->
        <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>

        <!-- Navbar -->
        <nav class="navbar" :class="{ 'is-scrolled': isScrolled }" role="navigation" aria-label="Main navigation">
            <div class="navbar__inner">
                <a href="#hero" class="navbar__logo" @click.prevent="scrollToSection('hero')">JP.</a>

                <ul class="navbar__links" role="list">
                    <li v-for="link in NAV_LINKS" :key="link.id">
                        <a :href="'#' + link.id" @click.prevent="scrollToSection(link.id)">{{ link.label }}</a>
                    </li>
                </ul>

                <div class="navbar__actions">
                    <!-- Resume Button -->
                    <button class="resume-btn" @click="openResume" aria-label="View Resume">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                            <path d="M2 1h6l3 3v8H2V1z" stroke="currentColor" stroke-width="1.3"
                                stroke-linejoin="round" />
                            <path d="M8 1v3h3M4 6h5M4 8h5M4 10h3" stroke="currentColor" stroke-width="1.3"
                                stroke-linecap="round" />
                        </svg>
                        Resume
                    </button>

                    <!-- Theme Toggle -->
                    <button class="theme-toggle" :class="{ 'theme-toggle--dark': theme === 'dark' }"
                        :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
                        @click="toggleTheme">
                        <span class="theme-toggle__knob">
                            <span class="theme-toggle__icon">{{ theme === 'dark' ? '☀️' : '🌙' }}</span>
                        </span>
                    </button>

                    <button class="hamburger" :class="{ 'is-open': isMobileMenuOpen }"
                        :aria-expanded="String(isMobileMenuOpen)" aria-label="Toggle mobile menu"
                        @click="isMobileMenuOpen = !isMobileMenuOpen">
                        <span class="hamburger__line"></span>
                        <span class="hamburger__line"></span>
                        <span class="hamburger__line"></span>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }" role="dialog" aria-label="Mobile navigation">
            <a v-for="link in NAV_LINKS" :key="link.id" :href="'#' + link.id" class="mobile-menu__link"
                @click.prevent="scrollToSection(link.id)">
                {{ link.label }}
            </a>
            <button class="mobile-menu__resume" @click="openResume">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M2 1h6l3 3v8H2V1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" />
                    <path d="M8 1v3h3M4 6h5M4 8h5M4 10h3" stroke="currentColor" stroke-width="1.3"
                        stroke-linecap="round" />
                </svg>
                View Resume
            </button>
        </div>

        <!-- Slots for sections -->
        <slot></slot>

        <!-- Back to Top -->
        <button v-show="isScrolled" class="back-to-top" aria-label="Back to top" @click="scrollToSection('hero')">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>

        <!-- PDF Modal for Resume -->
        <PdfModal :is-open="showResumeModal" title="Jaspher Paoyo — Resume" :pdf-path="resumePath"
            download-filename="Jaspher_Paoyo_Resume.pdf" aria-label="Resume Preview" @close="closeResume" />
    </div>
</template>
