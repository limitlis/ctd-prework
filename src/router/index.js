import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/artworks'
        },
        {
            path: '/:collection(artworks|artists|exhibitions)',
            name: 'collectionList',
            component: () => import('@/views/CollectionPage.vue'),
            props: true,
        },
        {
            path: '/:collection(artworks|artists|exhibitions)/:id',
            name: 'collectionDetail',
            component: () => import('@/views/CollectionDetail.vue'),
            props: true,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/AboutPage.vue'),
            props: true,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'PathNotFound',
            component: () => import('@/views/PathNotFound.vue'),
        },
    ],
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
})

export default router
