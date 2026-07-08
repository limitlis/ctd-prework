<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const links = [
    { url: '/artworks', label: 'Artwork' },
    { url: '/exhibitions', label: 'Exhibitions' },
    // {url:'/about', label: 'About'},
]
</script>

<template>
<div class="">
    <nav class="py-4 px-2 sticky top-0 bg-background/60 backdrop-blur-md border-b z-20">
        <div class="max-w-3xl mx-auto flex justify-between items-center">
            <h1 class="font-display">Art API Demo</h1>
            <ul class="flex gap-4 text-base">
                <router-link v-for="link in links" :key="link.label" :to="link.url"
                    :class="[route.path.includes(link.url) ? 'active' : '']">{{ link.label }}</router-link>
            </ul>
        </div>
    </nav>
    <div class="max-w-3xl mx-auto min-h-screen px-2 py-6">
        <router-view :key="route.path"></router-view>
    </div>
</div>
</template>

<style scoped>
@reference './styles/index.css';

:deep(.active) {
    @apply text-accent;
}
</style>
