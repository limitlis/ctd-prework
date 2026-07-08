<script setup lang="ts">
import { onMounted, ref } from 'vue';
// Sizes: 200, 400, 600, 843
const { imageId, size = 400, alt } = defineProps<{ imageId: string | null, size?: number, alt?: string }>();
const getImageUrl = (): string => {
    if (imageId) {
        return `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
    }
    return '/not-available.webp';
};

const src = ref<string | null>(null);
let hasErrored = false;
function onError(e: Event) {
    if (e.target && e.target instanceof HTMLImageElement && !hasErrored) {
        e.target.src = location.host.includes('localhost') ? '/not-available.webp' : '/ctd-prework/not-available.webp';
        hasErrored = true;
    }
}
onMounted(() => {
    src.value = getImageUrl();
});
</script>

<template>
<div class="overflow-hidden bg-border">
    <img v-if="src" :src :alt loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-contrast"
        crossorigin="anonymous" @error="onError" />
    <div v-else class="w-full h-full bg-contrast">

    </div>
</div>
</template>