<script lang="ts" setup>
import Avatar from '@/shared/components/Avatar.vue'
</script>

<template>
  <nav class="bg-primary">
    <div class="mx-auto flex justify-between items-center p-4">
      <router-link to="/" class="text-white font-bold text-lg">Poke App</router-link>
      <div>
        <ul class="flex text-white gap-3">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/team">Team</RouterLink></li>
        </ul>
      </div>
      <div class="w-8">
        <Avatar src="/img/avatar1.jpg" alt="User avatar" />
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
