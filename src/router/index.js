import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/artworks'
        },
        {
            path: '/:collection(artworks|galleries|exhibitions)/:page?',
            name: 'collectionList',
            component: () => import('@/views/CollectionPage.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'PathNotFound',
            component: () => import('@/views/PathNotFound.vue'),
        },
    ],
})

export default router
