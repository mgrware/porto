<template>
  <section id="architecture" class="py-20 bg-surface-container/20 scroll-mt-24">
    <div class="max-w-6xl mx-auto px-4">
      <SheetHeading :title="m.practice.title" :note="m.practice.note" />

      <p v-reveal class="max-w-3xl mx-auto text-center text-lg md:text-xl text-on-surface-variant leading-relaxed mb-14">
        {{ m.practice.intro }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        <div
          v-for="principle in m.practice.principles"
          :key="principle.code"
          v-reveal
          class="group relative overflow-hidden glass glass-hover p-8"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/15 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <div class="relative flex gap-5">
            <span class="shrink-0 w-12 h-12 rounded-2xl grid place-items-center font-headline font-bold text-on-primary bg-gradient-to-br from-primary to-primary-container shadow-lg shadow-primary/30">
              {{ principle.code }}
            </span>
            <div class="min-w-0">
              <h3 class="font-headline text-xl font-semibold text-on-surface mb-2">{{ principle.title }}</h3>
              <p class="text-on-surface-variant leading-relaxed">{{ principle.body }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-reveal class="glass p-6 md:p-8">
        <div class="text-sm font-semibold text-secondary mb-6 text-center">{{ m.practice.detail }}</div>
        <ol class="flex flex-col lg:flex-row items-stretch gap-3">
          <li v-for="(node, index) in m.practice.nodes" :key="node.code" class="flex flex-col lg:flex-row items-center gap-3 flex-1 min-w-0">
            <div class="w-full flex-1 rounded-xl border border-outline-variant/40 bg-background/40 px-4 py-3 text-center hover:border-primary/50 transition-colors">
              <div class="text-sm font-semibold text-on-surface">{{ node.label }}</div>
              <div class="text-xs text-outline mt-1">{{ node.meta }}</div>
            </div>
            <BaseIcon v-if="index < m.practice.nodes.length - 1" class="text-primary rotate-90 lg:rotate-0">arrow_forward</BaseIcon>
          </li>
        </ol>
        <p class="text-xs text-outline text-center mt-6">{{ m.practice.observable }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'
import SheetHeading from '../molecules/SheetHeading.vue'

const { m } = useLocale()
</script>
