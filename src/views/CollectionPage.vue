<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import { api } from '@/services/aic-api';
import { ApiResponseData, Artwork } from '@/types';
import ArtworkCard from '@/components/ArtworkCard.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const results = ref<Artwork[]>([]);
const error = ref(null);
async function getPagedResults(page: string | number = 1) {
    const result = await api.get<ApiResponseData<Artwork>>(`artworks?page=${page}&limit=5`)
        .catch((err) => {
            error.value = err;
        });
    if (result?.status === 200) {
        const { data } = result.data;
        console.log(data);
        results.value = data;
    }
}
onMounted(() => {
    getPagedResults(route.params.page as string);
});
</script>

<template>
<div>
    <ArtworkCard v-for="art in results" :art :key="art.id" />
</div>
</template>
