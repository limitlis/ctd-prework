<script setup lang="ts">
import { ApiResponseData, Artist, Artwork, Exhibition } from '@/types';
import CollectionCard from '@/components/CollectionCard.vue';
import CollectionImage from '@/components/CollectionImage.vue';
import { onMounted, ref } from 'vue';
import { api } from '@/services/aic-api';
const { item } = defineProps<{ item: Exhibition }>()

const relatedItems = ref<Artwork[]>([]);
const relatedArtists = ref<Artist[]>([]);
const error = ref(null);
async function getFeaturedArtworks() {
    const result = await api.get<ApiResponseData<Artwork[]>>(`artworks?ids=${item.artwork_ids.join()}`)
        .catch((err) => {
            error.value = err;
        });
    if (result?.status === 200) {
        const { data } = result.data;
        relatedItems.value = data;
    }
}
async function getFeaturedArtists() {
    const result = await api.get<ApiResponseData<Artist[]>>(`artists?ids=${item.artist_ids.join()}`)
        .catch((err) => {
            error.value = err;
        });
    if (result?.status === 200) {
        const { data } = result.data;
        relatedArtists.value = data;
    }
}
onMounted(() => {
    if (item.artwork_ids?.length) {
        getFeaturedArtworks();
    }
    if (item.artist_ids?.length) {
        getFeaturedArtists();
    }
});
</script>

<template>
<div v-if="item" class="space-y-5">
    <h1 class="text-2xl font-display flex flex-col border-b pb-6">
        {{ item.title }}
        <span class="text-accent text-base">{{ item.gallery_title }}</span>
    </h1>
    <img :src="item.image_url" crossorigin="anonymous" alt="" class="w-full">
    <div class="grid grid-cols-12 gap-4">
        <CollectionImage v-if="item.image_id" :image-id="item.image_id" :size="400"
            class="col-span-12 sm:col-span-4 max-w-60 mr-4" />
        <div class="col-span-12 sm:col-span-8">
            <p class="prose" v-html="item.short_description"></p>

            <template v-if="relatedArtists.length">
                <h2 class="font-display text-xl pt-6">Featured Artists</h2>
                <div class="flex flex-col gap-6 py-3 text-xl">
                    <ul>
                        <li v-for="artist in relatedArtists" :key="artist.id">
                            • <router-link :to="`/artists/${artist.id}`" class="hover:text-accent cursor-pointer">{{
                                artist.title
                            }}</router-link>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
    </div>
    <template v-if="relatedItems.length">
        <h2 class="font-display text-xl pt-6">Featured Works</h2>
        <div class="grid grid-cols-12 gap-6 py-4">
            <template v-for="item in relatedItems" :key="item.id">
                <CollectionCard :item />
            </template>
        </div>
    </template>
</div>
</template>