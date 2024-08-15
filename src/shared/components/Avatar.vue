<script lang="ts" setup>
defineProps({
  src: String,
  alt: String,
  size: {
    type: Number,
    default: 2
  }
})
</script>

<template>
  <img :src="src" :alt="alt" class="w-full h-auto rounded-full" />
</template>
