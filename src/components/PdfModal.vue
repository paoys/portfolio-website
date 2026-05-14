<script setup>
defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    pdfPath: {
        type: String,
        required: true,
    },
    downloadFilename: {
        type: String,
        default: 'document.pdf',
    },
    ariaLabel: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: '📄',
    },
})

const emit = defineEmits(['close'])

const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
        emit('close')
    }
}
</script>

<template>
    <Teleport to="body">
        <Transition name="pdf-modal">
            <div v-if="isOpen" class="pdf-modal__backdrop" @click="handleBackdropClick" role="dialog"
                :aria-label="ariaLabel" aria-modal="true">
                <div class="pdf-modal__panel">
                    <div class="pdf-modal__header">
                        <div class="pdf-modal__title">
                            <span class="pdf-modal__icon" aria-hidden="true">{{ icon }}</span>
                            {{ title }}
                        </div>
                        <div class="pdf-modal__actions">
                            <a :href="pdfPath" :download="downloadFilename"
                                class="pdf-modal__btn pdf-modal__btn--download" title="Download">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <path d="M7.5 2v8M4 7l3.5 3.5L11 7M2 12h11" stroke="currentColor" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Download
                            </a>
                            <button class="pdf-modal__btn pdf-modal__btn--close" @click="emit('close')"
                                aria-label="Close">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <path d="M2 2l11 11M13 2L2 13" stroke="currentColor" stroke-width="1.5"
                                        stroke-linecap="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="pdf-modal__body">
                        <iframe :src="pdfPath + '#toolbar=0&navpanes=0'" class="pdf-modal__iframe"
                            :title="title"></iframe>
                        <div class="pdf-modal__fallback">
                            <p>Can't preview?</p>
                            <a :href="pdfPath" target="_blank" rel="noopener noreferrer">Open in new tab</a>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
