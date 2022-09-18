<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <router-link
    :to="to"
    class="text-sm text-blue-400 hover:text-blue-800 duration-200 transition ease-in-out"
  >
    <slot />
  </router-link>
</template>
