<script lang="ts" setup>
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <main>
    <Navbar />
    <Sidebar />
    <RouterView />
  </main>
</template>
