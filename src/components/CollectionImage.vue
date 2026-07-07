<script setup lang="ts">
import { onMounted, ref } from 'vue';
// Sizes: 200, 400, 600, 843
const { imageId, size = 843, alt } = defineProps<{ imageId: string, size?: number, alt?: string }>();
const getImageUrl = (): string => {
    return `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
};

const src = ref<string | null>(null);

onMounted(() => {
    src.value = getImageUrl();
});
</script>

<template>
<div class="overflow-hidden bg-border">
    <img v-if="src" :src :alt
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-contrast" />
</div>
</template>