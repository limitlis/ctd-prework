<script setup lang="ts" generic="T extends Artwork|Gallery|Exhibition">
import { onMounted, ref, watch } from 'vue';
import { api } from '@/services/aic-api';
import { ApiResponseData, Artwork, Exhibition, Gallery } from '@/types';
import CollectionCard from '@/components/CollectionCard.vue';
import CollectionPagination from '@/components/CollectionPagination.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const results = ref<T[]>([]);
const currentPage = ref(1);
const total = ref(0);
const error = ref(null);
async function getPagedResults() {
    const result = await api.get<ApiResponseData<T>>(`${route.params.collection}?page=${currentPage.value}&query[term][is_public_domain]=true`)
        .catch((err) => {
            error.value = err;
        });
    if (result?.status === 200) {
        const { data, pagination } = result.data;
        total.value = pagination.total;
        results.value = data;
    }
}
onMounted(() => {
    currentPage.value = route.query?.page ? parseInt(route.query?.page as string) : 1;
    getPagedResults();
});
watch(currentPage, (newVal) => {
    router.replace({ path: route.path, query: { page: newVal } });
});
</script>

<template>
<div class="grid grid-cols-12 gap-6 py-8">
    <template v-for="item in results" :key="item.id">
        <CollectionCard :item />
    </template>
</div>
<CollectionPagination v-model="currentPage" :total :items-per-page="12" @update:model-value="getPagedResults" />
</template>
