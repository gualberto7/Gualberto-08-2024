<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { usePokemon } from '@/pokemon/composables/usePokemon'
import type { Pokemon } from './interfaces/Pokemon'
import AudioPlayer from '@/shared/components/AudioPlayer.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const pokemon = ref<Pokemon>({
  name: '',
  url: '',
  id: 0
})
const pokemonEvolutionChain = ref<string[]>([])

const { show, getEvolutionChain } = usePokemon()

onMounted(async () => {
  pokemon.value = await show(props.name)
  console.log(pokemon.value)
  getEvolution()
})

const getEvolution = async () => {
  const evolutionChain = await getEvolutionChain(pokemon.value.id)
  let current = evolutionChain.chain
  while (current) {
    pokemonEvolutionChain.value.push(current.species.name)
    current = current.evolves_to[0]
  }
}
</script>

<template>
  <div class="w-1/2 mx-auto my-5">
    <div class="shadow py-5 px-20">
      <div class="flex flex-col items-center mb-5">
        <img
          :src="`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`"
          :alt="pokemon.name"
          width="300"
        />
        <h1 class="text-2xl font-bold">{{ pokemon.name }}</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti nisi delectus, nulla
          asperiores rem quis sint rerum dolor ex minus voluptatum officiis ullam itaque deserunt
          quae temporibus voluptas laboriosam possimus.
        </p>
      </div>
      <div class="grid grid-cols-2">
        <div class="border-r">
          <div class="mb-2" v-if="pokemon.types?.length">
            <h3 class="text-sm mb-1 font-semibold">Types:</h3>
            <span
              v-for="(type, index) in pokemon.types"
              :key="index"
              class="text-xs bg-gray-200 rounded-full px-2 py-1 mr-2"
              >{{ type.type.name }}</span
            >
          </div>
          <div class="mb-2" v-if="pokemon.cries">
            <h3 class="text-sm mb-1 font-semibold">Cries:</h3>
            <AudioPlayer :url="pokemon.cries.latest" label="Play" />
          </div>
        </div>
        <div>
          <div class="mb-2" v-if="pokemon.stats?.length">
            <h3 class="text-sm mb-1 font-semibold">Stats:</h3>
            <div class="grid grid-cols-2 gap-1">
              <span v-for="(stat, index) in pokemon.stats" :key="index" class="text-xs"
                >* {{ stat.stat.name }}</span
              >
            </div>
          </div>
          <div>
            <h3 class="text-sm mb-1 font-semibold">height & weight</h3>
            <div class="grid grid-cols-2 gap-1">
              <span class="text-xs">Height: {{ pokemon.height }}</span>
              <span class="text-xs">Weight: {{ pokemon.weight }}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="my-3 font-bold">Cadena evolutiva</h2>
        <div class="flex items-center justify-center gap-10">
          <div v-for="pokemon in pokemonEvolutionChain" class="w-28 flex flex-col justify-evenly">
            <img :src="`https://img.pokemondb.net/artwork/${pokemon}.jpg`" :alt="pokemon" />
            <h2>{{ pokemon }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
