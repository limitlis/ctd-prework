<template>
    <div class="mx-auto p-4 text-center grid-cols-12">
        <div
            class="flex justify-center items-center space-x-2"
            :class="{ 'pointer-events-none opacity-50': !isPageEnabled }"
        >
            <button
                @click="changePage(-1)"
                :disabled="currentPage === 1"
                class="px-4 py-2 rounded-lg transition duration-150 border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Prev
            </button>
            <template v-for="page in pageRange" :key="page">
                <button
                    @click="goToPage(page)"
                    :disabled="currentPage === page"
                    class="px-4 py-2 rounded-lg font-medium transition duration-150 border cursor-pointer"
                    :class="[currentPage === page ? 'bg-accent/60' : 'hover:bg-accent']"
                >
                    {{ page }}
                </button>
            </template>

            <button
                @click="changePage(1)"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-lg transition duration-150 cursor-pointer hover:bg-accent border disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
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
    const maxPagesToShow = windowWidth.value < 400 ? 3 : windowWidth.value < 500 ? 5 : 7;
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

onMounted(() => {
    window.addEventListener('resize', resizeListener);
});
onUnmounted(() => {
    window.removeEventListener('resize', resizeListener);
});
</script>
