<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NAV_LINKS } from '@/data/portfolio'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const scrollProgress = ref(0)
const theme = ref(localStorage.getItem('theme') || 'light')

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
                    <button class="theme-toggle"
                        :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
                        @click="toggleTheme">
                        <span v-if="theme === 'light'">🌙</span>
                        <span v-else>☀️</span>
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
    </div>
</template>
