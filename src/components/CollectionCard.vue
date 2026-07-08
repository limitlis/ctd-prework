<script setup lang="ts" generic="T extends Artwork | Exhibition">
import { useRoute } from 'vue-router';
import { Artwork, Exhibition } from '@/types';
import CollectionImage from './CollectionImage.vue';
const { item, collection = 'artworks' } = defineProps<{
    item: T;
    collection?: 'artworks' | 'exhibitions';
}>();
const route = useRoute();
</script>

<template>
    <div
        class="group flex flex-col relative col-span-12 sm:col-span-6 md:col-span-4 gap-2 space-y-2"
    >
        <router-link :to="`/${collection}/${item.id}`">
            <CollectionImage
                v-if="item?.image_id || item.id"
                :image-id="item.image_id"
                :size="400"
                class="aspect-square border"
            />
        </router-link>
        <div class="flex flex-col">
            <router-link :to="`/${collection}/${item.id}`" class="">
                <span class="font-display">{{ item.title }}</span>
            </router-link>
            <router-link
                v-if="
                    item.api_model === 'artworks' &&
                    (item as Artwork)?.artist_id &&
                    (item as Artwork)?.artist_title
                "
                :to="`/artists/${(item as Artwork).artist_id}`"
                class="text-muted hover:text-accent"
            >
                <span>{{ (item as Artwork)?.artist_title }}</span>
            </router-link>
        </div>
    </div>
</template>
