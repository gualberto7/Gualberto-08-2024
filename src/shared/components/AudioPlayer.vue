<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

const audioPlayer = ref<HTMLAudioElement | null>(null)

const playCry = () => {
  if (audioPlayer.value) {
    audioPlayer.value.src = props.url
    audioPlayer.value.play().catch((error) => {
      console.error('Error playing audio:', error)
    })
  }
}

const handleAudioError = (event: any) => {
  console.error('Audio error:', event)
}
</script>

<template>
  <div>
    <span class="text-xs cursor-pointer" @click="playCry">
      Play
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="currentColor"
      >
        <path d="M3 22V2l18 10L3 22z" />
      </svg>
    </span>
    <audio ref="audioPlayer" @error="handleAudioError"></audio>
  </div>
</template>
