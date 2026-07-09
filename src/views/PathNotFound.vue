<script setup lang="ts"></script>

<template>
<main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center space-y-4">
        <p class="text-base font-semibold text-accent">404</p>
        <h1 class="font-display mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            Page not found
        </h1>
        <p class="mt-6 text-lg font-medium text-pretty sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
            <router-link to="/"
                class="rounded-md bg-accent/80 hover:bg-accent px-3.5 py-2.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Go
                back home
            </router-link>
        </div>
    </div>
</main>
</template>
