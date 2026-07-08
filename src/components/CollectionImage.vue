<script setup lang="ts">
import { Thumbnail } from '@/types';
import { onMounted, ref, useTemplateRef } from 'vue';
// Sizes: 200, 400, 600, 843
const {
    imageId,
    thumbnail,
    size = 400,
    alt,
} = defineProps<{ imageId: string | null; size?: number; thumbnail?: Thumbnail; alt?: string }>();
const thumb = useTemplateRef<HTMLImageElement>('thumb');
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
        e.target.src = '/not-available.webp';
        hasErrored = true;
    }
}
let thumbHasErrored = false;
function onThumbError(e: Event) {

    if (e.target && e.target instanceof HTMLImageElement && !thumbHasErrored) {
        e.target.style.opacity = '0';
        thumbHasErrored = true;
    }
}
function onLoad(e: Event) {
    if (thumb.value) {
        thumb.value.style.opacity = '0';
    }
}
onMounted(() => {
    src.value = getImageUrl();
});
</script>

<template>
<div class="overflow-hidden bg-border relative">
    <img v-if="thumbnail?.lqip" ref="thumb" :src="thumbnail?.lqip" :alt
        class="absolute w-full h-full object-cover transition-all opacity-1" crossorigin="anonymous"
        @error="onThumbError" />
    <img v-if="src" :src :alt loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-contrast"
        crossorigin="anonymous" @load="onLoad" @error="onError" />
    <div v-else class="w-full h-full bg-contrast"></div>
</div>
</template>
