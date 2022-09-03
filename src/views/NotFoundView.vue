<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white"
  >
    <div class="max-w-xl px-5 text-center">
      <h2 class="mb-2 text-[42px] font-bold text-zinc-800">404</h2>
      <p class="mb-2 text-lg text-zinc-500">Page not found.</p>
      <router-link
        to="/"
        class="mt-3 inline-block w-96 rounded bg-purple-600 px-5 py-3 font-medium text-white shadow-md shadow-purple-500/20 hover:bg-purple-700"
        >Go back to Home</router-link
      >
    </div>
  </div>
</template>
