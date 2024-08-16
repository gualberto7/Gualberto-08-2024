<script lang="ts" setup>
import { usePokemonStore } from '@/stores/pokemon'
import { usePokemon } from '@/pokemon/composables/usePokemon'
import PokemonCard from '@/pokemon/components/pokemonCard.vue'
import { onMounted } from 'vue'

const { pokemonsTeam, pokemonCache } = usePokemonStore()
const { show } = usePokemon()

onMounted(() => {
  console.log('Pokemons team:', pokemonsTeam)
  pokemonsTeam.forEach(async (name) => {
    console.log('Name:', name)
    await show(name)
  })
})
</script>

<template>
  <div class="container mx-auto my-5">
    <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-10">
      <PokemonCard v-for="pokemon in pokemonCache" :key="pokemon.url" :pokemon="pokemon" />
    </div>
  </div>
</template>
