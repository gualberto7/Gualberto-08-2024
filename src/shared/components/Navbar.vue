<script lang="ts" setup>
import Avatar from '@/shared/components/Avatar.vue'
import { HOME_ROUTE_NAME, TEAM_ROUTE_NAME } from '@/shared/constants/routes'
</script>

<template>
  <nav class="bg-primary">
    <div class="mx-auto flex justify-between items-center p-4">
      <router-link to="/" class="text-white font-bold text-lg">Poke App</router-link>
      <div>
        <ul class="flex text-white gap-3">
          <li><RouterLink :to="{ name: HOME_ROUTE_NAME }">Home</RouterLink></li>
          <li><RouterLink :to="{ name: TEAM_ROUTE_NAME }">Team</RouterLink></li>
        </ul>
      </div>
      <div class="w-8">
        <Avatar src="/img/avatar1.jpg" alt="User avatar" />
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
