<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
    <canvas ref="canvas" class="absolute inset-0"></canvas>

    <div class="orb absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl bg-gradient-to-br from-primary/25 to-secondary/20"></div>
    <div class="orb absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full blur-3xl bg-gradient-to-br from-secondary/25 to-primary/15 [animation-delay:-4s]"></div>
    <div class="orb absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full blur-3xl bg-gradient-to-br from-primary/15 to-secondary/15 [animation-delay:-8s]"></div>

    <div class="absolute inset-0 bg-[linear-gradient(rgb(var(--secondary)/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--secondary)/0.04)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(var(--background))_100%)]"></div>
  </div>
</template>

<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null)
let frame = 0

onMounted(() => {
  const el = canvas.value
  const ctx = el?.getContext('2d')
  if (!el || !ctx) return

  const resize = () => {
    el.width = window.innerWidth
    el.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    cancelAnimationFrame(frame)
  })

  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * el.width,
    y: Math.random() * el.height,
    size: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    alpha: Math.random() * 0.5 + 0.2
  }))
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const draw = () => {
    // Read every frame so the light/dark toggle recolours the particles.
    const rgb = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim().split(/\s+/).join(',')
    ctx.clearRect(0, 0, el.width, el.height)
    particles.forEach((p, i) => {
      if (!still) {
        p.x = (p.x + p.vx + el.width) % el.width
        p.y = (p.y + p.vy + el.height) % el.height
      }
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb},${p.alpha})`
      ctx.fill()
      for (const q of particles.slice(i + 1)) {
        const d = Math.hypot(p.x - q.x, p.y - q.y)
        if (d >= 150) continue
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(q.x, q.y)
        ctx.strokeStyle = `rgba(${rgb},${0.12 * (1 - d / 150)})`
        ctx.stroke()
      }
    })
    if (!still) frame = requestAnimationFrame(draw)
  }
  draw()
})
</script>

<style scoped>
.orb { animation: orb-drift 14s ease-in-out infinite alternate; }
@keyframes orb-drift {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(120px, 80px) scale(1.2); }
}
@media (prefers-reduced-motion: reduce) {
  .orb { animation: none; }
}
</style>
