<script setup lang="ts">
import { ApiResponseData, Artist, Artwork } from '@/types';
import CollectionCard from '@/components/CollectionCard.vue';
import CardSkeleton from '@/components/skeletons/CardSkeleton.vue';
import { api } from '@/services/aic-api';
import { onMounted, ref } from 'vue';


const { item } = defineProps<{ item: Artist }>();

const relatedItems = ref<Artwork[]>([]);
const loadingRelated = ref(false);
const error = ref(null);

async function getRelatedArtworks() {
    loadingRelated.value = true;
    const relatedResults = await api
        .get<ApiResponseData<Artwork[]>>(`artworks/search?query[term][artist_id]=${item.id}`)
        .catch((err) => {
            error.value = err;
        });
    if (relatedResults?.status === 200) {
        const ids = relatedResults.data?.data?.map((r) => r.id) ?? [];
        const result = await api
            .get<ApiResponseData<Artwork[]>>(`artworks?ids=${ids.join()}`)
            .catch((err) => {
                error.value = err;
            });
        if (result?.status === 200) {
            const { data } = result.data;
            relatedItems.value = data;
        }
    }
    loadingRelated.value = false;
}
onMounted(() => {
    getRelatedArtworks();
});
</script>

<template>
<div class="space-y-5">
    <h1 class="text-2xl font-display flex flex-col border-b pb-6">
        {{ item.title }}
        <span class="text-accent text-base">{{ item.birth_date }}{{ item.death_date ? `— ${item.death_date}` : ''
        }}</span>
    </h1>

    <p v-if="item.description" class="prose border-b pb-6" v-html="item.description"></p>
    <!-- <p v-else>No description provided.</p> -->
    <h4 class="font-display text-xl pt-6">Related Works</h4>
    <div class="grid grid-cols-12 gap-6 py-8">
        <template v-if="!loadingRelated" v-for="item in relatedItems" :key="item.id">
            <CollectionCard :item />
        </template>
        <template v-else>
            <CardSkeleton v-for="i in 12" :key="i" />
        </template>
    </div>
</div>
</template>
