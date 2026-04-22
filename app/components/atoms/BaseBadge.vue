<template>
  <div
    :class="[
      'inline-block px-1 font-mono tracking-tighter uppercase',
      variantClasses[variant]
    ]"
    :style="variant === 'id' ? 'font-size: 8px;' : ''"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'surface' | 'id'

withDefaults(defineProps<{
  variant?: Variant
}>(), {
  variant: 'primary'
})

const variantClasses: Record<Variant, string> = {
  primary: 'bg-surface-container text-secondary text-xs border-l-2 border-secondary px-3 py-1',
  secondary: 'bg-primary/20 text-primary text-xs border border-primary/30 px-2 py-0.5',
  surface: 'bg-surface text-[10px] text-outline border border-outline-variant/30',
  id: 'bg-background text-primary'
}
</script>
