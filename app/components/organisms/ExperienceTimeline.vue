<template>
  <section id="experience" class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <SheetHeading sheet="03" :title="m.experience.title" :note="m.experience.note" />

    <div class="relative pl-3 sm:pl-6">
      <div class="absolute left-0 top-1.5 bottom-1.5 border-l border-dashed border-outline-variant/75"></div>
      <div class="absolute left-[-4px] top-0 w-[9px] h-px bg-outline-variant"></div>
      <div class="absolute left-[-4px] bottom-0 w-[9px] h-px bg-outline-variant"></div>

      <div class="flex flex-col gap-8">
        <div v-for="exp in m.experience.items" :key="exp.company" v-reveal class="relative min-w-0">
          <div class="absolute -left-3 sm:-left-6 top-3 w-3 sm:w-6 border-t border-dashed border-outline-variant/75"></div>
          <div
            :class="[
              'absolute -left-[1rem] sm:-left-[1.75rem] top-2 w-[9px] h-[9px] rotate-45',
              exp.current ? 'bg-primary' : 'bg-outline-variant'
            ]"
          ></div>

          <div class="flex flex-col gap-3.5">
            <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2 pb-3 border-b-2 border-outline-variant/50">
              <span class="text-mono text-xs tracking-[0.06em] text-primary shrink-0">{{ exp.period }}</span>
              <span class="font-headline text-[clamp(1.125rem,2vw,1.4375rem)] font-semibold -tracking-[0.015em] text-on-surface">{{ exp.role }}</span>
              <span class="text-mono text-[0.8125rem] text-secondary">{{ exp.company }}</span>
            </div>

            <ul class="flex flex-col gap-3 max-w-[62rem]">
              <li
                v-for="(desc, index) in exp.description"
                :key="index"
                class="flex gap-3.5 items-start text-[0.9375rem] leading-[1.6] text-on-surface-variant"
              >
                <span class="shrink-0 w-1.5 h-1.5 border border-outline-variant mt-2"></span>
                <span class="min-w-0 text-pretty">{{ desc }}</span>
              </li>
            </ul>

            <div class="flex flex-wrap gap-[0.4375rem] pt-1">
              <span
                v-for="tag in exp.tags"
                :key="tag"
                class="text-mono text-[0.6875rem] tracking-[0.04em] text-secondary border border-outline-variant/55 px-2 py-1"
              >{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SheetHeading from '../molecules/SheetHeading.vue'

const { m } = useLocale()
</script>
