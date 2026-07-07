<script setup lang="ts" generic="T extends Artwork|Gallery|Exhibition">
import { onMounted, ref } from 'vue';
import { api } from '@/services/aic-api';
import { ApiResponseData, Artwork, Exhibition, Gallery } from '@/types';
import CollectionCard from '@/components/CollectionCard.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const results = ref<T[]>([]);
const error = ref(null);
async function getPagedResults(page: string | number = 1) {
    const result = await api.get<ApiResponseData<T>>(`${route.params.collection}?page=${page}&query[term][is_public_domain]=true`)
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
<div class="grid grid-cols-12 gap-6 py-8">
    <template v-for="item in results" :key="item.id">
        <CollectionCard :item />
    </template>
</div>
</template>
