<script setup lang="ts" generic="T extends Artwork|Gallery|Exhibition">
import { onMounted, ref } from 'vue';
import { api } from '@/services/aic-api';
import { ApiResponseData, Artwork, ArtworkESResult, Exhibition, Gallery } from '@/types';
import { useRoute, useRouter } from 'vue-router';
import CollectionCard from '@/components/CollectionCard.vue';
import CollectionImage from '@/components/CollectionImage.vue';
const route = useRoute();
const router = useRouter();
const item = ref<T | null>(null);
const relatedItems = ref<Artwork[]>([]);
const error = ref(null);
async function getItem(id: string) {
    const result = await api.get<ApiResponseData<T>>(`${route.params.collection}/${id}`)
        .catch((err) => {
            error.value = err;
        });
    if (result?.status === 200) {
        const { data } = result.data;
        console.log(data);
        item.value = data;
    }
}
async function getRelatedArtworks(aristId: string) {
    const result = await api.get<ApiResponseData<Artwork>>(`artworks/?query[term][artist_id]=${route.params.id}`)
        .catch((err) => {
            console.log(err);
            // error.value = err;
        });
    if (result?.status === 200) {
        const { data } = result.data;
        console.log(data);
        relatedItems.value = data;
    }
}
onMounted(() => {
    getItem(route.params.id as string);
    if (route.params.collection === 'artists') {
        getRelatedArtworks(route.params.id as string);
    }
});
</script>

<template>
<div>
    <router-link :to="`/${route.params.collection}`" class="text-muted">&lt; {{ route.params.collection }}</router-link>
</div>
<article v-if="item" :key="item.id" class="space-y-4">
    <h1 class="text-2xl font-display flex flex-col">
        {{ item.title }}
        <span v-if="item.is_artist" class="font-display text-lg text-muted">{{ item.birth_date }} – {{ item.death_date
        }}</span>
        <span v-else class="text-accent text-base">{{ item.date_display }}</span>
    </h1>
    <template v-if="item.is_artist">
        <h3 class="font-display text-lg">{{ item.artist_display }}</h3>
    </template>

    <p class="prose" v-html="item.description"></p>

    <CollectionImage :image-id="item.image_id" />

    <div class="grid md:grid-cols-12 gap-6 py-8">
        <template v-for="item in relatedItems" :key="item.id">
            <img :src="item?.thumbnail?.lqip" :alt="item?.thumbnail?.alt_text" class="w-120">
        </template>
    </div>
</article>
</template>
