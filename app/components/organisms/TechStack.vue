<template>
  <section id="stack" class="py-20 scroll-mt-24">
    <div class="max-w-6xl mx-auto px-4">
      <SheetHeading :title="m.stack.title" :note="m.stack.note" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(group, index) in m.stack.groups"
          :key="group.code"
          v-reveal
          class="group relative overflow-hidden glass glass-hover p-7"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <div class="relative">
            <div class="w-14 h-14 mb-5 rounded-2xl grid place-items-center bg-gradient-to-br from-primary/20 to-secondary/20 border border-outline-variant/30 text-primary group-hover:scale-110 transition-transform duration-500">
              <BaseIcon class="text-3xl">{{ icons[index] }}</BaseIcon>
            </div>
            <h3 class="font-headline text-xl font-semibold text-on-surface mb-4">{{ group.title }}</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="item in group.items" :key="item" class="chip">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto mt-16">
        <div v-for="skill in skills" :key="skill.name" v-reveal class="group">
          <div class="flex justify-between gap-4 mb-3">
            <span class="font-semibold text-on-surface group-hover:text-primary transition-colors duration-300">{{ skill.name }}</span>
            <span class="font-mono font-semibold text-on-surface-variant">{{ skill.level }}%</span>
          </div>
          <div
            class="h-4 rounded-full overflow-hidden bg-on-surface/5 border border-outline-variant/30"
            role="progressbar"
            :aria-label="skill.name"
            :aria-valuenow="skill.level"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div class="skill-fill h-full rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30" :style="{ '--level': `${skill.level}%` }"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'
import SheetHeading from '../molecules/SheetHeading.vue'
import { skills } from '~/composables/useSkills'

const { m } = useLocale()
const icons = ['cloud', 'code', 'database', 'speed']
</script>

<style scoped>
/* Bars grow from 0 when v-reveal marks the row as shown. */
.skill-fill { width: 0; transition: width 1.2s cubic-bezier(0.22, 0.61, 0.36, 1) 0.3s; }
[data-reveal='shown'] .skill-fill { width: var(--level); }
@media (prefers-reduced-motion: reduce) {
  .skill-fill { width: var(--level); transition: none; }
}
</style>
