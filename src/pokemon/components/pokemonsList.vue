<script lang="ts" setup>
import { usePokemon } from '../composables/usePokemon'
import { usePokemonStore } from '@/stores/pokemon'

import PokemonCard from './pokemonCard.vue'
usePokemon()
const { pomkemonsList } = usePokemonStore()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-10">
    <PokemonCard v-for="pokemon in pomkemonsList" :key="pokemon.url" :pokemon="pokemon" />
  </div>
</template>
