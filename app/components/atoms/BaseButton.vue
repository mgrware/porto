<template>
  <button
    :class="[
      'font-label uppercase tracking-widest text-xs font-bold transition-all flex items-center justify-center gap-2',
      variantClasses[variant],
      sizeClasses[size]
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'surface' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  variant?: Variant
  size?: Size
}>(), {
  variant: 'primary',
  size: 'md'
})

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary-fixed hover:bg-primary-dim',
  surface: 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/20',
  outline: 'border border-primary text-primary hover:bg-primary/10',
  ghost: 'text-on-surface-variant hover:text-primary'
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1',
  md: 'px-4 py-2',
  lg: 'px-8 py-4'
}
</script>
