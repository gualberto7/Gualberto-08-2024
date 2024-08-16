<script setup lang="ts">
import { type Pokemon } from '@/pokemon/interfaces/Pokemon'
import AudioPlayer from '@/shared/components/AudioPlayer.vue'
import { ref } from 'vue'

defineProps({
  pokemon: {
    type: Object as () => Pokemon,
    required: true
  }
})

const emit = defineEmits(['addPokemon'])
const teamMember = ref(false)

const addPokemon = (pokemon: Pokemon) => {
  emit('addPokemon', pokemon, teamMember.value)
}
</script>

<template>
  <div class="pokemon-card bg-white shadow-md rounded-lg p-4">
    <img :src="`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`" :alt="pokemon.name" />

    <div class="border-t">
      <div class="flex justify-between">
        <label for="name" class="text-md font-bold">{{ pokemon.name }}</label>
        <input id="name" type="checkbox" v-model="teamMember" @change="addPokemon(pokemon)" />
      </div>
      <div v-if="pokemon.types?.length">
        <h3 class="text-sm mb-1">Types:</h3>
        <span
          v-for="(type, index) in pokemon.types"
          :key="index"
          class="text-xs bg-gray-200 rounded-full px-2 py-1 mr-2"
          >{{ type.type.name }}</span
        >
      </div>
      <div v-if="pokemon.stats?.length">
        <h3 class="text-sm mb-1">Stats:</h3>
        <span
          v-for="(stat, index) in pokemon.stats"
          :key="index"
          class="text-xs bg-gray-200 rounded-full px-2 py-1 mr-2"
        >
          {{ stat.stat.name }}
        </span>
      </div>
      <div v-if="pokemon.cries">
        <h3 class="text-sm mb-1">Cries:</h3>
        <AudioPlayer :url="pokemon.cries.latest" label="Play" />
      </div>
    </div>
  </div>
</template>

<style>
.pokemon-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
</style>
