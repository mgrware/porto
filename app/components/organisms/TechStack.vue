<template>
  <section id="tech-stack" class="px-8 lg:px-16 py-20 bg-surface-container-low">
    <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <div>
        <h2 class="font-headline text-3xl font-bold uppercase tracking-tight mb-2">Technical_Stack</h2>
        <p class="text-on-surface-variant font-body">Hardened toolset for modern infrastructure</p>
      </div>
      <div class="h-px flex-1 bg-outline-variant/20 mx-8 hidden md:block"></div>
      <div class="text-mono text-xs text-primary font-bold tracking-widest">CORE_CAPABILITIES.V1</div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
      <div 
        v-for="(stack, index) in techStacks" 
        :key="stack.title"
        :class="[
          'group p-8 bg-surface border border-outline-variant/10 hover:bg-surface-container-high transition-all',
          index > 0 && 'lg:border-l-0'
        ]"
      >
        <div :class="[stack.iconColor, 'mb-6']">
          <BaseIcon class="text-4xl">{{ stack.icon }}</BaseIcon>
        </div>
        <h3 class="font-headline font-bold mb-4 uppercase">{{ stack.title }}</h3>
        <ul class="space-y-3 font-body text-sm text-on-surface-variant">
          <li v-for="skill in stack.skills" :key="skill" class="flex items-center gap-2">
            <span class="w-1 h-1 bg-primary"></span>
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'

const techStacks = [
  {
    title: 'Infrastructure',
    icon: 'cloud_done',
    iconColor: 'text-secondary',
    skills: ['Kubernetes / Docker', 'Terraform (IaC)', 'AWS / GCP / Azure']
  },
  {
    title: 'Languages',
    icon: 'code',
    iconColor: 'text-primary',
    skills: ['Go (Golang)', 'Ruby', 'PHP', 'Javascript']
  },
  {
    title: 'Data_Storage',
    icon: 'database',
    iconColor: 'text-tertiary',
    skills: ['PostgreSQL / MySQL', 'Redis / Memcached', 'MongoDB']
  },
  {
    title: 'Performance',
    icon: 'speed',
    iconColor: 'text-error',
    skills: ['Prometheus / Grafana', 'Distributed Tracing', 'Load Balancing']
  }
]
</script>
