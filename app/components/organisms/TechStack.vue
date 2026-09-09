<template>
  <section id="stack" class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <SheetHeading sheet="02" title="Tech stack" note="Parts list — the tooling these systems are actually built on." />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-outline-variant/50">
      <div
        v-for="group in stacks"
        :key="group.code"
        v-reveal
        class="border-r border-b border-outline-variant/50 px-[1.375rem] pt-6 pb-7 bg-surface-container/35 min-w-0"
      >
        <div class="flex items-center justify-between gap-3 mb-[1.125rem]">
          <span class="text-mono text-[0.625rem] tracking-[0.12em] text-outline">{{ group.code }}</span>
          <span class="w-2.5 h-2.5 border border-primary rotate-45"></span>
        </div>
        <h3 class="font-headline text-[1.0625rem] font-semibold text-on-surface mb-4">{{ group.title }}</h3>
        <ul class="flex flex-col gap-2.5">
          <li
            v-for="item in group.items"
            :key="item"
            class="flex items-baseline gap-2.5 text-mono text-[0.8125rem] leading-[1.5] text-on-surface-variant"
          >
            <span class="shrink-0 w-3 h-px bg-outline-variant -translate-y-1"></span>
            <span class="min-w-0">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SheetHeading from '../molecules/SheetHeading.vue'

const stacks = [
  {
    code: 'INF · 01',
    title: 'Infrastructure',
    items: ['Docker / Docker Compose', 'Kubernetes', 'Terraform (IaC)', 'AWS / GCP', 'Nginx / Traefik']
  },
  {
    code: 'LNG · 02',
    title: 'Languages',
    items: ['Ruby / Rails', 'Go', 'Node.js / NestJS', 'PHP / Laravel', 'JavaScript']
  },
  {
    code: 'DAT · 03',
    title: 'Data storage',
    items: ['PostgreSQL', 'MySQL / SQL Server', 'Redis / Memcached', 'MongoDB', 'Prisma / ActiveRecord']
  },
  {
    code: 'PRF · 04',
    title: 'Performance',
    items: ['Prometheus / Grafana', 'Distributed tracing', 'Load balancing', 'Query & index tuning', 'BullMQ / Sidekiq']
  }
]
</script>
