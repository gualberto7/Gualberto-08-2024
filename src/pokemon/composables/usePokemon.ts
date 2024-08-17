import api from '@/api/pokeApi'
import { usePokemonStore } from '@/stores/pokemon'
import { ref } from 'vue'

export const usePokemon = (paginate: number = 151) => {
  const { setPokemons, addPokemonToCache, pokemonCache } = usePokemonStore()
  const pageQuery = ref<string>(`?limit=${paginate}`)

  const index = async () => {
    const pokemons = await api.get(`pokemon${pageQuery.value}`)
    pageQuery.value = '?' + pokemons.data.next.split('?')[1]
    setPokemons(pokemons.data.results)
  }

  const show = async (name: string) => {
    if (!pokemonCache[name]) {
      const pokemon = await api.get(`pokemon/${name}`)
      addPokemonToCache(pokemon.data)
      return pokemon.data
    }
    return pokemonCache[name]
  }

  const getEvolutionChain = async (id: number) => {
    const evolutionChain = await api.get(`/evolution-chain/${id}`)
    return evolutionChain.data
  }

  return {
    index,
    show,
    getEvolutionChain
  }
}
