<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { type Pokemon } from '@/pokemon/interfaces/Pokemon'
import AudioPlayer from '@/shared/components/AudioPlayer.vue'
import { POKEMON_DETAIL_NAME } from '@/shared/constants/routes'
import { usePokemonStore } from '@/stores/pokemon'

const props = defineProps({
  pokemon: {
    type: Object as () => Pokemon,
    required: true
  },
  isTeamMember: {
    type: Boolean,
    default: false
  },
  imgSize: {
    type: Number,
    default: 130
  }
})

const emit = defineEmits(['addPokemon', 'removePokemon'])
const { pokemonsTeam } = usePokemonStore()
const teamMember = ref(false)

const addPokemon = (pokemon: Pokemon) => {
  emit('addPokemon', pokemon, teamMember.value)
}

const removePokemon = (pokemon: Pokemon) => {
  emit('removePokemon', pokemon.name)
}

onMounted(() => {
  teamMember.value = pokemonsTeam.includes(props.pokemon.name)
})
</script>

<template>
  <div data-cy="pokemon-card" class="pokemon-card bg-white shadow-md rounded-lg p-4">
    <div class="w-full flex flex-col items-center">
      <img
        :src="`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`"
        :alt="pokemon.name"
        :width="imgSize"
      />
    </div>

    <div class="border-t">
      <div class="flex justify-between mb-3">
        <label for="name" class="text-md font-bold">{{ pokemon.name }}</label>
        <input
          v-if="!isTeamMember"
          id="name"
          type="checkbox"
          v-model="teamMember"
          @change="addPokemon(pokemon)"
          :data-cy="`checkbox-${pokemon.name}`"
        />
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          class="trash-icon"
          @click="removePokemon(pokemon)"
          data-cy="remove-from-team-icon"
        >
          <path d="M3 6h18v2H3V6zm2 3h14v13H5V9zm3-6h8v2H8V3z" />
        </svg>
      </div>

      <div class="mb-2" v-if="pokemon.types?.length">
        <h3 class="text-sm mb-1 font-semibold">Types:</h3>
        <span
          v-for="(type, index) in pokemon.types"
          :key="index"
          class="text-xs bg-gray-200 rounded-full px-2 py-1 mr-2"
          >{{ type.type.name }}</span
        >
      </div>

      <div class="mb-2" v-if="pokemon.stats?.length">
        <h3 class="text-sm mb-1 font-semibold">Stats:</h3>
        <div class="grid grid-cols-2 gap-1">
          <span v-for="(stat, index) in pokemon.stats" :key="index" class="text-xs"
            >* {{ stat.stat.name }}</span
          >
        </div>
      </div>

      <div class="mb-2" v-if="pokemon.cries">
        <h3 class="text-sm mb-1 font-semibold">Cries:</h3>
        <AudioPlayer :url="pokemon.cries.latest" label="Play" />
      </div>

      <div v-if="isTeamMember">
        <RouterLink :to="{ name: POKEMON_DETAIL_NAME, params: { name: pokemon.name } }">
          Mas detalles
        </RouterLink>
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
.pokemon-card .trash-icon {
  @apply text-danger;
}
</style>
