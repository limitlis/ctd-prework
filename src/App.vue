<script setup></script>

<template>
<div class="max-w-3xl mx-auto">
  <nav class="py-4 px-2 flex justify-between items-center sticky top-0 bg-background/60 backdrop-blur-md">
    <h1 class="font-display">Art API Demo</h1>
    <!-- <ul class="flex gap-3 text-xl">
      <li>Art</li>
      <li>Artist</li>
    </ul> -->
  </nav>
  <main class="min-h-screen">
    <router-view></router-view>
  </main>
</div>
</template>

<style scoped></style>
