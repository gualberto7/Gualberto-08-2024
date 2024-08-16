import type { Pokemon } from '@/pokemon/interfaces/Pokemon'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = reactive<Pokemon[]>([])
  const myPokemons = reactive<string[]>([])
  const cache = reactive<{ [key: string]: Pokemon }>({})

  const setPokemons = (_pokemons: Pokemon[]) => {
    Object.assign(pokemons, _pokemons)
  }

  const addPokemonstToTeam = (pokemon: String[]) => {
    // using set to avoid duplicates
    const newPokemons = new Set([...myPokemons, ...pokemon])
    Object.assign(myPokemons, [...newPokemons])
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
    pokemonCache
  }
})
