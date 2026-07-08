<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
<div class="">
  <nav class="py-4 px-2 sticky top-0 bg-background/60 backdrop-blur-md border-b z-20">
    <div class="max-w-3xl mx-auto flex justify-between items-center ">
      <h1 class="font-display">Art API Demo</h1>
      <ul class="flex gap-3 text-base">
        <router-link to="/artworks">Artworks</router-link>
      </ul>
    </div>
  </nav>
  <main class="max-w-3xl mx-auto min-h-screen px-2 py-6">
    <router-view :key="route.path"></router-view>
  </main>
</div>
</template>

<style scoped></style>
