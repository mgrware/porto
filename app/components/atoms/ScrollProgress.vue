<template>
  <div class="fixed top-0 inset-x-0 h-1 bg-on-surface/5 z-[70]" aria-hidden="true">
    <div
      class="h-full bg-gradient-to-r from-primary to-secondary origin-left shadow-lg shadow-primary/50"
      :style="{ transform: `scaleX(${progress})` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
const progress = ref(0)

const update = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? window.scrollY / max : 0
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', update))
</script>
