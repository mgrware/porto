<template>
  <section id="experience" class="py-20 bg-surface-container/20 scroll-mt-24">
    <div class="max-w-6xl mx-auto px-4">
      <SheetHeading :title="m.experience.title" :note="m.experience.note" />

      <div class="relative max-w-5xl mx-auto">
        <div class="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-primary/20 hidden md:block"></div>

        <div class="space-y-12">
          <div
            v-for="(exp, index) in m.experience.items"
            :key="exp.period"
            v-reveal
            :class="['relative flex', index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse']"
          >
            <div
              :class="[
                'absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background hidden md:block z-10',
                exp.current ? 'bg-primary ring-4 ring-primary/30' : 'bg-gradient-to-r from-primary to-secondary'
              ]"
            ></div>

            <div :class="['w-full md:w-[calc(50%-2rem)]', index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto']">
              <div class="group relative overflow-hidden glass glass-hover p-7">
                <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div class="relative">
                  <div class="flex items-center gap-2 text-primary mb-3">
                    <BaseIcon class="text-lg">work</BaseIcon>
                    <span class="text-sm font-semibold">{{ exp.company }}</span>
                  </div>
                  <h3 class="font-headline text-xl font-bold text-on-surface mb-2">{{ exp.role }}</h3>
                  <div class="flex items-center gap-2 text-outline mb-4">
                    <BaseIcon class="text-base">calendar_month</BaseIcon>
                    <span class="text-sm font-medium">{{ exp.period }}</span>
                  </div>

                  <ul class="space-y-2 mb-5">
                    <li
                      v-for="(desc, i) in exp.description"
                      :key="i"
                      class="flex items-start gap-2 text-sm leading-relaxed text-on-surface-variant"
                    >
                      <span class="text-primary font-bold">▸</span>
                      <span class="min-w-0 text-pretty">{{ desc }}</span>
                    </li>
                  </ul>

                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in exp.tags" :key="tag" class="chip">{{ tag }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'
import SheetHeading from '../molecules/SheetHeading.vue'

const { m } = useLocale()
</script>
