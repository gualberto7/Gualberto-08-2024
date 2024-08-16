import type { Pokemon } from '@/pokemon/interfaces/Pokemon'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = reactive<Pokemon[]>([])
  const myPokemons = reactive<string[]>([])
  const cache = reactive<{ [key: string]: Pokemon }>({})

  const setPokemons = (_pokemons: Pokemon[]) => {
    pokemons.splice(0, pokemons.length, ..._pokemons)
  }

  const addPokemonstToTeam = (pokemons: string[]) => {
    // using set to avoid duplicates
    const newPokemons = new Set([...myPokemons, ...pokemons])
    myPokemons.splice(0, myPokemons.length, ...newPokemons)
  }

  const removePokemonFromTeam = (pokemon: string) => {
    const index = myPokemons.findIndex((p) => p === pokemon)
    if (index !== -1) {
      myPokemons.splice(index, 1)
    }
  }

  const addPokemonToCache = (pokemon: Pokemon) => {
    cache[pokemon.name] = pokemon
  }

  const pomkemonsList = computed(() => pokemons)
  const pokemonsTeam = computed(() => myPokemons)
  const pokemonCache = computed(() => cache)

  return {
    pokemons,
    setPokemons,
    pomkemonsList,
    pokemonsTeam,
    addPokemonstToTeam,
    addPokemonToCache,
    pokemonCache,
    removePokemonFromTeam
  }
})
