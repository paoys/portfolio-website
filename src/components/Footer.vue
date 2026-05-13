<script setup>
import { computed } from 'vue'
import { FOOTER_LINKS } from '@/data/portfolio'

const currentYear = computed(() => new Date().getFullYear())

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
    <div class="divider" role="separator"></div>

    <footer class="footer" role="contentinfo">
        <div class="container footer__inner">
            <span class="footer__logo">JP.</span>
            <p class="footer__copy">© {{ currentYear }} Jaspher Paoyo. All rights reserved.</p>
            <nav class="footer__links" aria-label="Footer navigation">
                <a v-for="link in FOOTER_LINKS" :key="link.id" :href="'#' + link.id"
                    @click.prevent="scrollToSection(link.id)">
                    {{ link.label }}
                </a>
            </nav>
        </div>
    </footer>
</template>
