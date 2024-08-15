import api from '@/api/pokeApi'
import { onMounted } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'

export const usePokemon = () => {
  const pokemonStore = usePokemonStore()

  onMounted(async () => {
    await index()
  })

  const index = async () => {
    const pokemons = await api.get('pokemon?limit=10')
    pokemonStore.setPokemons(pokemons.data.results)
  }
}
