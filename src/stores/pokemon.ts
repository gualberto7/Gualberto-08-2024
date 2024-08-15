import type { Pokemon } from '@/pokemon/interfaces/Pokemon'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = reactive<Pokemon[]>([])

  const setPokemons = (_pokemons: Pokemon[]) => {
    Object.assign(pokemons, _pokemons)
  }

  const pomkemonsList = computed(() => pokemons)

  return {
    pokemons,
    setPokemons,
    pomkemonsList
  }
})
