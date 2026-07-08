<script setup lang="ts" generic="T extends Artwork|Gallery|Exhibition">
import { computed, onMounted, ref } from 'vue';
import { api } from '@/services/aic-api';
import { ApiResponseData, Artwork, Exhibition, Gallery } from '@/types';
import { useRoute, useRouter } from 'vue-router';

import ArtworkDetail from '@/layouts/ArtworkDetail.vue';
import ExhibitionDetail from '@/layouts/ExhibitionDetail.vue';
import ArtistDetail from '@/layouts/ArtistDetail.vue';

const route = useRoute();
const router = useRouter();
const item = ref<T>();
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

const currentView = computed(() => {
    switch (route.params.collection) {
        case 'artworks':
            return ArtworkDetail;
        case 'exhibitions':
            return ExhibitionDetail;
        case 'artists':
            return ArtistDetail;
        default:
            return ArtworkDetail;
    }
})
onMounted(() => {
    getItem(route.params.id as string);
});
</script>

<template>
<main>
    <div class="text-sm">
        <a @click="router.back()" class="text-muted hover:text-accent cursor-pointer">&lt; back</a>
    </div>
    <article v-if="item && currentView" :key="item.id" class="space-y-4">
        <component :is="currentView" :item />
    </article>
</main>
</template>
