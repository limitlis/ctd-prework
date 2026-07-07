<script setup lang="ts">
import { Artwork } from '@/types';

const { art } = defineProps<{
    art: Artwork
}>();
</script>

<template>
<div>
    {{ art.id }} | {{ art.title }}
</div>
</template>