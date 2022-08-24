<script setup>
import router from "@/router";
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();

async function handleLogout() {
  await authStore.logout();

  router.push({ name: "login" });
}
</script>
<template>
  <nav class="bg-purple-600 text-white">
    <div class="container mx-auto">
      <div class="flex items-center">
        <router-link
          to="/todos"
          class="inline-block px-16 py-4 transition-colors hover:bg-purple-500 duration-300"
          >Todos</router-link
        >
        <a
          @click="handleLogout"
          class="inline-block px-16 py-4 transition-colors hover:bg-purple-500 duration-300 cursor-pointer"
          >Logout</a
        >
      </div>
    </div>
  </nav>
</template>
