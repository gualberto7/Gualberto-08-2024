<script setup lang="ts">
import { type Pokemon } from '@/pokemon/interfaces/Pokemon'
defineProps({
  pokemon: {
    type: Object as () => Pokemon,
    required: true
  }
})
</script>

<template>
  <div class="pokemon-card bg-white shadow-md rounded-lg p-4">
    <img :src="`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`" :alt="pokemon.name" />

    <h2 class="text-md font-bold">{{ pokemon.name }}</h2>
  </div>
</template>

<style>
.pokemon-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
</style>
