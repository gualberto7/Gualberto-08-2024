<script lang="ts" setup>
import { usePokemonStore } from '@/stores/pokemon'
import { usePokemon } from '@/pokemon/composables/usePokemon'
import PokemonCard from '@/pokemon/components/pokemonCard.vue'
import { onMounted, ref } from 'vue'

const { pokemonsTeam, pokemonCache, removePokemonFromTeam } = usePokemonStore()
const { show } = usePokemon()
const loading = ref(true)

onMounted(() => {
  loadData()
})

const loadData = async () => {
  const promises = pokemonsTeam.map(async (name) => {
    await show(name)
  })
  await Promise.all(promises)
  loading.value = false
}

const removePokemon = (name: string) => {
  removePokemonFromTeam(name)
}
</script>

<template>
  <div v-if="!loading" class="container mx-auto my-5">
    <h3 v-if="pokemonsTeam.length < 1">No tienes pokemos en tu equipo aun</h3>
    <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-10">
      <PokemonCard
        v-for="(pokemon, index) in pokemonsTeam"
        :key="index"
        :pokemon="pokemonCache[pokemon]"
        :img-size="200"
        is-team-member
        @remove-pokemon="removePokemon"
      />
    </div>
  </div>
</template>
