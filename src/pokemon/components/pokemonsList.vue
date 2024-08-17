<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { usePokemon } from '../composables/usePokemon'
import { usePokemonStore } from '@/stores/pokemon'
import { type Pokemon } from '../interfaces/Pokemon'
import PokemonCard from './pokemonCard.vue'
import Button from '@/shared/components/Button.vue'
import { TEAM_ROUTE_NAME } from '@/shared/constants/routes'

const pokemonsToAdd = reactive<string[]>([])
const { index } = usePokemon()
const { pomkemonsList, addPokemonstToTeam } = usePokemonStore()
const router = useRouter()
const isLoading = ref(true)

onMounted(async () => {
  await index()
  isLoading.value = false
  window.addEventListener('scroll', handleScroll)
})

const handleScroll = async () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading.value) {
    isLoading.value = true
    await index()
    isLoading.value = false
  }
}

const addPokemon = (pokemon: Pokemon, teamMember: boolean) => {
  if (teamMember) {
    pokemonsToAdd.push(pokemon.name)
  } else {
    const index = pokemonsToAdd.findIndex((name) => name === pokemon.name)
    pokemonsToAdd.splice(index, 1)
  }
}

const addPokemons = () => {
  console.log('Pokemons to add:', pokemonsToAdd)
  addPokemonstToTeam(pokemonsToAdd)
  router.push({ name: TEAM_ROUTE_NAME })
}

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <div class="flex items-center gap-5">
      <span
        >Total pokemones seleccionamos: <strong>{{ pokemonsToAdd.length }}</strong></span
      >
      <Button
        @click="addPokemons"
        size="sm"
        :disabled="pokemonsToAdd.length < 1 || pokemonsToAdd.length > 6"
        >Agregar al equipo</Button
      >
    </div>
    <div class="my-5 border"></div>
    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-10">
      <PokemonCard
        v-for="pokemon in pomkemonsList"
        :key="pokemon.url"
        :pokemon="pokemon"
        @add-pokemon="addPokemon"
      />
    </div>
  </div>
</template>
