<script setup lang="ts" generic="T extends Artwork|Gallery|Exhibition">
import { onMounted, ref, watch } from 'vue';
import { api } from '@/services/aic-api';
import { ApiResponseData, Artwork, ESSearchResult, Exhibition, Gallery } from '@/types';
import CollectionCard from '@/components/CollectionCard.vue';
import CollectionPagination from '@/components/CollectionPagination.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const results = ref<T[]>([]);
const currentPage = ref(1);
const total = ref(0);
const search = ref('');
const error = ref(null);
const loading = ref(false);
async function getPagedResults() {
    loading.value = true;
    let queryParams = [
        `page=${currentPage.value}`,
        // 'query[term][is_public_domain]=true',
        `limit=12`,
    ];

    if (search.value?.length) {
        queryParams.push(`q=${search.value}`);

        const searchResult = await api.get<ApiResponseData<ESSearchResult>>(`${route.params.collection}${search.value?.length ? '/search' : ''}?${queryParams.join('&')}`)
            .catch((err) => {
                error.value = err;
            });
        if (searchResult?.status === 200) {
            const { pagination } = searchResult.data;
            if (searchResult.data?.data?.length) {
                const ids = searchResult.data?.data?.map((r) => r.id) ?? [];
                const result = await api.get<ApiResponseData<T>>(`${route.params.collection}?ids=${ids.join()}`)
                    .catch((err) => {
                        error.value = err;
                    });
                if (result?.status === 200) {
                    const { data } = result.data;
                    total.value = pagination.total;
                    results.value = data;
                    router.replace({ path: route.path, query: { page: currentPage.value, search: search.value } });
                    loading.value = false;
                    return;
                }
            }
        }
        results.value = [];
    } else {
        const result = await api.get<ApiResponseData<T>>(`${route.params.collection}?${queryParams.join('&')}`)
            .catch((err) => {
                error.value = err;
            });
        if (result?.status === 200) {
            const { data, pagination } = result.data;
            total.value = pagination.total;
            results.value = data;
            router.replace({ path: route.path, query: { page: currentPage.value } });
            loading.value = false;
            return;
        }
        results.value = [];
    }
    loading.value = false;
}
function doSearch() {
    currentPage.value = 1;
    getPagedResults();
}
function clearSearch() {
    search.value = '';
    currentPage.value = 1;
    getPagedResults();
}
onMounted(() => {
    currentPage.value = route.query?.page ? parseInt(route.query?.page as string) : 1;
    search.value = route.query?.search ? route.query?.search as string : '';
    getPagedResults();
});

</script>

<template>
<main>
    <div class="w-full border-b pb-4">
        <form @submit.prevent="doSearch">
            <div class="relative flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                    <path fill-rule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                        clip-rule="evenodd" />
                </svg>


                <div class="relative flex-1">
                    <input v-model="search" type="search" name="search" class="w-full bg-transparent text-sm border rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-accent hover:border-accent
                        [&::-webkit-search-cancel-button]:appearance-none" placeholder="Artwork, Artists..." />
                    <button v-if="search.length" type="button" id="clear-btn" @click="clearSearch()"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                        aria-label="Clear search">
                        <svg xmlns="http://w3.org" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <button
                    class="rounded-md py-2 px-4 border text-center text-sm transition-all pointer-cursor hover:shadow-lg focus:bg-accent focus:shadow-none active:bg-accent hover:bg-accent active:shadow-none
                        disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ml-2"
                    type="submit">
                    Search
                </button>
            </div>
        </form>
    </div>

    <template v-if="!loading && results.length > 0">
        <div class="grid grid-cols-12 gap-6 py-8">
            <CollectionCard v-if="['artworks', 'exhibitions'].includes(route.params.collection as string)"
                v-for="item in results" :key="item.id" :item
                :collection="route.params.collection as 'artworks' | 'exhibitions'" />

        </div>
        <CollectionPagination v-model="currentPage" :total :items-per-page="12" @update:model-value="getPagedResults" />
    </template>
    <template v-else-if="!loading && results.length === 0">
        <h3 class="font-display text-2xl col-span-12 text-center">No results to display.</h3>
    </template>
    <template v-else-if="loading">
        <h3 class="font-display text-xl col-span-12 text-center mt-12">loading...</h3>
    </template>
</main>
</template>
