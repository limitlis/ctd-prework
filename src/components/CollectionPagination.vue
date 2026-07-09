<template>
<div class="mx-auto p-4 text-center grid-cols-12">
    <div class="flex justify-center items-center space-x-2"
        :class="{ 'pointer-events-none opacity-50': !isPageEnabled }">
        <button @click="goToPage(1)" :disabled="currentPage === 1" aria-label="First page"
            class="px-3 py-2 rounded-lg transition duration-150 border hover:bg-accent disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed text-xs">
            First
        </button>
        <button @click="changePage(-1)" :disabled="currentPage === 1" aria-label="Prev page"
            class="px-3 py-2 rounded-lg transition duration-150 border hover:bg-accent disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="h-4">
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z" />
            </svg>
        </button>
        <template v-for="page in pageRange" :key="page">
            <button @click="goToPage(page)" :disabled="currentPage === page" :aria-label="`Page ${page}`"
                :aria-current="currentPage === page ? 'page' : undefined"
                class="px-4 py-2 rounded-lg font-medium transition duration-150 border cursor-pointer text-xs"
                :class="[currentPage === page ? 'bg-accent/60' : 'hover:bg-accent']">
                {{ numberDisplay(page) }}
            </button>
        </template>

        <button @click="changePage(1)" :disabled="currentPage === totalPages" aria-label="Next page"
            class="px-2 py-2 rounded-lg transition duration-150 cursor-pointer hover:bg-accent border disabled:opacity-50 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="h-4">
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z" />
            </svg>
        </button>
        <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages" aria-label="Last page"
            class="px-2 py-2 rounded-lg transition duration-150 border hover:bg-accent disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed text-xs">
            Last
        </button>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
const debounce = (callback: Function, wait: number) => {
    let timeoutId = -1;
    return (...args: any) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, wait);
    };
};

const { total = 0, itemsPerPage = 12 } = defineProps<{
    total: number;
    itemsPerPage: number;
}>();

const currentPage = defineModel<number>({ default: 1 });

const totalPages = computed(() => {
    return Math.ceil(total / itemsPerPage);
});
const windowWidth = ref(window.innerWidth);

const pageRange = computed(() => {
    const maxPagesToShow = windowWidth.value < 600 ? 3 : windowWidth.value < 768 ? 5 : 7;
    const start = Math.max(
        1,
        Math.min(
            currentPage.value - Math.floor(maxPagesToShow / 2),
            totalPages.value - maxPagesToShow + 1,
        ),
    );
    const end = Math.min(totalPages.value, start + maxPagesToShow - 1);

    const actualStart = Math.max(1, end - maxPagesToShow + 1);

    const pages = [];
    for (let i = actualStart; i <= end; i++) {
        pages.push(i);
    }
    return pages;
});

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const changePage = (delta: number) => {
    const newPage = currentPage.value + delta;
    if (newPage >= 1 && newPage <= totalPages.value) {
        currentPage.value = newPage;
    }
};

const isPageEnabled = computed(() => totalPages.value > 1);
const resizeListener = debounce(() => {
    windowWidth.value = window.innerWidth;
}, 250);

function numberDisplay(page: number) {
    return page.toLocaleString();
}
onMounted(() => {
    window.addEventListener('resize', resizeListener);
});
onUnmounted(() => {
    window.removeEventListener('resize', resizeListener);
});
</script>
