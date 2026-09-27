<template>
  <!-- A dimension line being measured: the loader speaks the same drafting language as the sheets. -->
  <div role="status" class="flex flex-col items-center justify-center gap-4 py-20 select-none">
    <div class="relative w-48 h-3 flex items-center" aria-hidden="true">
      <span class="absolute left-0 h-3 w-px bg-outline"></span>
      <span class="absolute right-0 h-3 w-px bg-outline"></span>
      <span class="w-full h-px bg-outline-variant/70"></span>
      <span class="absolute left-0 w-12 h-[3px] bg-primary animate-bp-measure"></span>
    </div>
    <span class="text-mono text-[0.6875rem] tracking-[0.12em] text-outline">{{ label || m.loading }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label?: string }>()

const { m } = useLocale()
</script>
