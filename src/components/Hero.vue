<script setup>
const heroScrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
    <section id="hero" class="hero" aria-label="Introduction">
        <div class="hero__background" aria-hidden="true">
            <div class="hero__grid"></div>
            <div class="hero__glow"></div>
        </div>

        <div class="container hero__content">
            <div class="hero__badge">
                <span class="hero__badge-dot" aria-hidden="true"></span>
                Available for opportunities
            </div>

            <h1 class="hero__title">
                Jaspher<br />
                <span class="hero__title-dim">Paoyo</span>
            </h1>

            <p class="hero__description">
                Web Developer building scalable full-stack systems, automating complex workflows, and crafting
                clean digital experiences.
            </p>

            <div class="hero__actions">
                <a href="#projects" class="btn btn--primary" @click.prevent="heroScrollToSection('projects')">
                    View Work
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </a>
                <a href="#contact" class="btn btn--outline" @click.prevent="heroScrollToSection('contact')">
                    Get in Touch
                </a>
            </div>

            <div class="hero__socials">
                <a href="mailto:paoyojaspher@gmail.com" class="hero__social-link">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm2 0l4 4 4-4"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Email
                </a>
                <a href="https://linkedin.com/in/jpaoyo" target="_blank" rel="noopener noreferrer"
                    class="hero__social-link">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                            d="M3 5h2v7H3V5zm1-1.5A1.25 1.25 0 114 2a1.25 1.25 0 010 1.5zM7 5h1.9v1h.05A2.1 2.1 0 0111 5c2.1 0 2.5 1.4 2.5 3.2V12h-2V8.7c0-.8 0-1.9-1.15-1.9S9 7.7 9 8.6V12H7V5z"
                            fill="currentColor" />
                    </svg>
                    LinkedIn
                </a>
                <a href="tel:+639761084219" class="hero__social-link">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                            d="M3 3a1 1 0 011-1h1.5a1 1 0 011 .75l.5 2a1 1 0 01-.3.9L6 6.5a8 8 0 003.5 3.5l.85-.7a1 1 0 01.9-.3l2 .5a1 1 0 01.75 1V12a1 1 0 01-1 1C5.4 13 3 7.6 3 4V3z"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    +63 976 108 4219
                </a>
            </div>
        </div>

        <div class="hero__scroll-indicator" aria-hidden="true">
            <span>scroll</span>
            <div class="hero__scroll-line"></div>
        </div>
    </section>
</template>
