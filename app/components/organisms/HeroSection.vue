<template>
  <section id="terminal" class="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row items-center px-8 lg:px-16 py-12 gap-12 border-b border-surface-container-high bg-surface">
    <div class="flex-1 space-y-8">
      <div class="relative w-24 h-24 mb-6 group">
        <div class="absolute -inset-1 border border-primary/30 opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div class="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary"></div>
        <div class="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary"></div>
        <div class="w-full h-full overflow-hidden bg-surface-container-highest">
          <img 
            alt="Systems Architect Profile" 
            class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
            src="~/assets/images/avatar.jpg"
          />
        </div>
        <div class="absolute -bottom-2 -right-2 bg-background px-1">
          <BaseBadge variant="id">ID_VERIFIED</BaseBadge>
        </div>
      </div>

      <BaseBadge variant="primary">
        FULLSTACK_SOFTWARE_ENGINEER // VERSION_1.0.4
      </BaseBadge>

      <h1 class="font-headline text-5xl lg:text-7xl font-bold leading-none tracking-tighter uppercase">
        Programming <br/>
        <span class="text-primary">Scalable</span> <br/>
        Systems
      </h1>

      <p class="font-body text-on-surface-variant max-w-xl text-lg leading-relaxed">
        An experienced programmer with a decade of experience in large scale projects especially using ruby on rails ones, My experience includes integrating third-party APIs, such as the Shopeepay  API, Stripe API, implementing AES-256 encryption  and meta programming for generate code dynamically and reducing redundancy code. In my free time, I also gained experience with Golang, Node.js, and PHP, which has broadened my understanding of backend development across multiple ecosystems.
      </p>

      <div class="flex flex-wrap gap-4 pt-4">
        <NuxtLink to="/projects">
          <BaseButton variant="primary" size="lg">
            VIEW PROJECTS
            <BaseIcon>arrow_forward</BaseIcon>
          </BaseButton>
        </NuxtLink>
        <BaseButton variant="surface" size="lg">
          GET IN TOUCH
        </BaseButton>
      </div>
    </div>

    <!-- Terminal Visualizer -->
    <div class="flex-1 w-full max-w-2xl">
      <div class="bg-surface-container-lowest border border-outline-variant/30 shadow-2xl overflow-hidden">
        <div class="bg-surface-container px-4 py-2 flex justify-between items-center border-b border-outline-variant/10">
          <div class="flex gap-2">
            <div class="w-3 h-3 bg-error-dim"></div>
            <div class="w-3 h-3 bg-tertiary-dim"></div>
            <div class="w-3 h-3 bg-primary-dim"></div>
          </div>
          <span class="text-mono text-[10px] text-outline uppercase tracking-widest">system_monitor.go</span>
        </div>
        <div class="p-6 font-headline text-sm leading-relaxed overflow-x-auto">
          <div v-for="(line, index) in codeLines" :key="index" class="flex gap-4">
            <span class="text-outline/40 select-none">{{ (index + 1).toString().padStart(2, '0') }}</span>
            <span v-html="line"></span>
          </div>
          
          <div class="mt-8 pt-4 border-t border-outline-variant/10 flex items-center gap-4 text-xs">
            <span class="text-primary">● RUNNING</span>
            <span class="text-on-surface-variant">Uptime: 99.99%</span>
            <span class="text-on-surface-variant">Nodes: 42</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'
import BaseButton from '../atoms/BaseButton.vue'
import BaseBadge from '../atoms/BaseBadge.vue'

const codeLines = [
  '<span class="text-tertiary">package</span> <span class="text-on-surface">main</span>',
  '<span>&nbsp;</span>',
  '<span class="text-secondary">func</span> <span class="text-primary">initCoreArchitecture</span><span class="text-on-surface">() {</span>',
  '<span class="text-on-surface-variant">&nbsp;&nbsp;// Initializing Docker clusters...</span>',
  '<span class="text-on-surface">&nbsp;&nbsp;stack := []string{<span class="text-primary">"Go"</span>, <span class="text-primary">"Ruby"</span>, <span class="text-primary">"Javascript"</span>, <span class="text-primary">"Docker"</span>}</span>',
  '<span class="text-on-surface">&nbsp;&nbsp;</span><span class="text-secondary">for</span> <span class="text-on-surface">_, tech := </span><span class="text-secondary">range</span> <span class="text-on-surface">stack {</span>',
  '<span class="text-on-surface">&nbsp;&nbsp;&nbsp;&nbsp;deploy.Scale(tech, <span class="text-tertiary">1000</span>)</span>',
  '<span class="text-on-surface">&nbsp;&nbsp;}</span>',
  '<span class="text-on-surface">}</span>'
]
</script>
