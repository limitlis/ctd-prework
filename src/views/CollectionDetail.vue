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
    const relatedResults = await api.get<ApiResponseData<Artwork>>(`artworks/search?query[term][artist_id]=${route.params.id}`)
        .catch((err) => {
            console.log(err);
            // error.value = err;
        });
    if (relatedResults?.status === 200) {
        const ids = relatedResults.data?.data?.map((r) => r.id) ?? [];
        const result = await api.get<ApiResponseData<Artwork>>(`artworks?ids=${ids.join()}`)
            .catch((err) => {
                error.value = err;
            });
        if (result?.status === 200) {
            const { data } = result.data;
            console.log(data);
            relatedItems.value = data;
        }
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
<main>
    <div class="text-sm">
        <a @click="router.back()" class="text-muted hover:text-accent cursor-pointer">&lt; back</a>
    </div>
    <article v-if="item" :key="item.id" class="space-y-4">
        <h1 class="text-2xl font-display flex flex-col border-b pb-6">
            {{ item.title }}
            <span v-if="item.artist_id" class="font-sans font-light text-lg text-muted">
                {{ item.artist_title }}
            </span>
            <span v-if="item.is_artist" class="font-display text-lg text-muted">
                {{ item.birth_date }}
                <template v-if="item.death_date">– {{ item.death_date }}</template>
            </span>
            <span v-else class="text-accent text-base">{{ item.date_display }}</span>
        </h1>
        <template v-if="item.is_artist">
            <h3 class="font-display text-lg">{{ item.artist_display }}</h3>
            <h4 class="font-display text-xl">Related Works</h4>
            <div class="grid md:grid-cols-12 gap-6 py-8">
                <template v-for="item in relatedItems" :key="item.id">
                    <CollectionCard :item />
                </template>
            </div>
        </template>
        <template v-else>
            <CollectionImage v-if="item.image_id" :image-id="item.image_id" />
            <p class="prose" v-html="item.description"></p>
        </template>

    </article>
</main>
</template>
