<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white"
  >
    <div class="max-w-xl px-5 text-center">
      <h2 class="mb-2 text-[42px] font-bold text-zinc-800">404</h2>
      <p class="mb-2 text-lg text-zinc-500">Page not found.</p>
      <CallToAction>Go Back to Home</CallToAction>
    </div>
  </div>
</template>
<script setup>
import CallToAction from "@/components/buttons/CallToAction.vue";
</script>
