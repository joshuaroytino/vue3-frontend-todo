<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import CallToAction from "@/components/buttons/CallToAction.vue";

const route = useRouter();
const authStore = useAuthStore();

let isSuccessful = ref(false);
let message = ref("");

async function handleRequest() {
  let [error, success] = await authStore.verifyEmail(route.currentRoute.value);

  if (error) {
    message.value = error?.response?.data?.message || error?.message;
  }

  if (success) {
    isSuccessful.value = true;
    message.value = success.data.message;
  }
}

onMounted(() => {
  setTimeout(() => {
    handleRequest();
  }, 2500);
});
</script>
<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white"
    v-if="message.length === 0"
  >
    <h2 class="mb-2 text-[42px] font-bold text-purple-500">Verifying ...</h2>
    <p class="mb-2 text-lg text-zinc-500">
      Verifying your account. Please wait for a while.
    </p>
  </div>

  <div
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white"
    v-if="message.length > 0"
  >
    <div class="max-w-xl px-5 text-center">
      <h2 class="mb-2 text-[42px] font-bold text-green-500" v-if="isSuccessful">
        Successful Verification
      </h2>
      <h2 class="mb-2 text-[42px] font-bold text-red-500" v-if="!isSuccessful">
        Failed to Verify
      </h2>
      <p class="mb-2 text-lg text-zinc-500">
        {{ message }}
      </p>
      <CallToAction>Go to Login</CallToAction>
    </div>
  </div>
</template>
