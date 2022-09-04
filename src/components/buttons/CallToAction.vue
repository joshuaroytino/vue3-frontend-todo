<script setup>
defineProps({
  to: {
    type: String,
    default: "/",
  },
});
</script>
<template>
  <router-link
    :to="to"
    class="mt-3 inline-block w-96 rounded bg-purple-600 px-5 py-3 font-medium text-white shadow-md shadow-purple-500/20 hover:bg-purple-700"
    ><slot
  /></router-link>
</template>
