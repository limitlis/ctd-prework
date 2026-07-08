<script setup lang="ts">
import { Artwork } from '@/types';
import CollectionCard from '@/components/CollectionCard.vue';
import CollectionImage from '@/components/CollectionImage.vue';
const { item } = defineProps<{ item: Artwork }>();

const displayDetails = [
    'dimensions',
    'department_title',
    'medium_display',
    'place_of_origin',
    'technique_titles',
];
</script>

<template>
<div class="space-y-5">
    <h1 class="text-2xl font-display flex flex-col border-b pb-6">
        {{ item.title }}
        <router-link v-if="item.artist_id" :to="`/artists/${item.artist_id}`"
            class="font-sans font-light text-lg text-muted hover:text-accent">
            {{ item.artist_title }}
        </router-link>
        <span class="text-accent text-base">{{ item.date_display }}</span>
    </h1>
    <CollectionImage v-if="item.image_id" :image-id="item.image_id" :thumbnail="item.thumbnail" />
    <p class="text-center text-sm text-muted">{{ item.credit_line }}</p>
    <p class="prose" v-html="item.description"></p>

    <div class="flex flex-col border-t">
        <div v-if="item.dimensions" class="p-4 border-b">
            <h3 class="text-sm font-display">Dimensions</h3>
            <p class="text-xs font-light">{{ item.dimensions }}</p>
        </div>
        <div v-if="item.department_title" class="p-4 border-b">
            <h3 class="text-sm font-display">Department</h3>
            <p class="text-xs font-light">{{ item.department_title }}</p>
        </div>
        <div v-if="item.medium_display" class="p-4 border-b">
            <h3 class="text-sm font-display">Medium</h3>
            <p class="text-xs font-light">{{ item.medium_display }}</p>
        </div>
        <div v-if="item.place_of_origin" class="p-4 border-b">
            <h3 class="text-sm font-display">Origin</h3>
            <p class="text-xs font-light">{{ item.place_of_origin }}</p>
        </div>
        <div v-if="item?.technique_titles?.length" class="p-4 border-b">
            <h3 class="text-sm font-display">Techniques</h3>
            <p class="text-xs font-light">
                <span v-for="(tech, index) in item.technique_titles" :key="tech">{{ tech
                }}<span v-if="index < item.technique_titles.length - 1">, </span></span>
            </p>
        </div>
    </div>
</div>
</template>
