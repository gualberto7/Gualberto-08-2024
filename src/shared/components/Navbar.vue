<script lang="ts" setup>
import Avatar from '@/shared/components/Avatar.vue'
</script>

<template>
  <nav class="bg-sky-600">
    <div class="mx-auto flex justify-between items-center p-4">
      <router-link to="/" class="text-white font-bold text-lg">Poke App</router-link>
      <div>
        <ul class="flex text-white gap-3">
          <li><a href="">Home</a></li>
          <li><a href="">Groups</a></li>
        </ul>
      </div>
      <div class="w-10">
        <Avatar src="/img/avatar1.jpg" alt="User avatar" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Add your custom styles here */
</style>
