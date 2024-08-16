<script lang="ts" setup>
import { computed } from 'vue'
import { type color } from '@/shared/types/rootTypes'

const props = defineProps({
  color: {
    type: String as () => color,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const sizes: { [key: string]: string } = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-2 py-1 text-md',
  lg: 'px-4 py-2 text-lg'
}

const classes = computed(() => {
  const colorClass = `bg-${props.color}`
  const sizeClass = sizes[props.size] || sizes.md
  const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  return `${colorClass} ${sizeClass} ${disabledClass}`
})
</script>

<template>
  <button :class="classes" class="text-white rounded-lg">
    <slot></slot>
  </button>
</template>
