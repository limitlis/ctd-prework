<script setup lang="ts" generic="T extends Artwork|Artist">
import { useRoute } from 'vue-router';
import { Artist, Artwork, Exhibition, Gallery } from '@/types';
import CollectionImage from './CollectionImage.vue';
const { item } = defineProps<{
    item: T
}>();
const route = useRoute();

</script>

<template>
<div class="group flex flex-col relative col-span-12 sm:col-span-6 md:col-span-4 gap-2 space-y-2">
    <router-link :to="`/${route.params.collection}/${item.id}`">
        <CollectionImage v-if="item?.image_id" :image-id="item.image_id" :size="400" class="aspect-square" />
    </router-link>
    <div class="flex flex-col">
        <router-link :to="`/${route.params.collection}/${item.id}`" class="">
            <span class="font-display">{{ item.title }}</span>
        </router-link>
        <router-link v-if="item.artist_id" :to="`/artists/${item.artist_id}`" class="">
            <span class="text-muted">{{ item?.artist_title }}</span>
        </router-link>
    </div>
</div>
</template>