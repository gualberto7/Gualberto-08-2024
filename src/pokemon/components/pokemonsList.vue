<script lang="ts" setup>
import { usePokemon } from '../composables/usePokemon'
import { usePokemonStore } from '@/stores/pokemon'
import PokemonCard from './pokemonCard.vue'
import { onMounted, reactive } from 'vue'
import { type Pokemon } from '../interfaces/Pokemon'
import Button from '@/shared/components/Button.vue'
import { useRouter } from 'vue-router'

const pokemonsToAdd = reactive<string[]>([])
const { index } = usePokemon()
const { pomkemonsList, addPokemonstToTeam } = usePokemonStore()
const router = useRouter()

onMounted(() => {
  index()
})

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
  router.push('/team')
}
</script>

<template>
  <div>
    <div class="flex items-center gap-5">
      <span
        >Total pokemones seleccionamos: <strong>{{ pokemonsToAdd.length }}</strong></span
      >
      <Button @click="addPokemons" size="sm" :disabled="pokemonsToAdd.length < 1"
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
