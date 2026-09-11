<template>
  <section id="hero" class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-10 lg:pt-20 pb-12 lg:pb-20">
    <div class="flex items-center gap-4 mb-7 lg:mb-11">
      <span class="text-mono text-[0.6875rem] tracking-[0.14em] text-primary">{{ m.sheet }} 01</span>
      <span class="flex-1 h-px bg-outline-variant/45"></span>
      <span class="hidden sm:inline text-mono text-[0.6875rem] tracking-[0.14em] text-outline">{{ m.hero.caption }}</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
      <div v-reveal class="flex flex-col gap-6 min-w-0">
        <div class="flex items-stretch gap-4">
          <div class="relative shrink-0 w-[84px] h-[84px] border border-outline-variant/60 p-[5px] bg-surface-container/60">
            <img
              src="~/assets/images/avatar.jpg"
              alt="Gilang Ramadan"
              class="w-full h-full object-cover grayscale contrast-[1.05] opacity-90"
            />
            <span class="absolute -top-px -left-px w-[9px] h-[9px] border-t-2 border-l-2 border-primary"></span>
            <span class="absolute -bottom-px -right-px w-[9px] h-[9px] border-b-2 border-r-2 border-primary"></span>
          </div>
          <div class="flex flex-col justify-center gap-1.5 border-l border-dashed border-outline-variant/60 pl-4 min-w-0">
            <div class="text-mono text-[0.6875rem] tracking-[0.1em] text-secondary">REF. GR-BE-2026</div>
            <div class="text-mono text-[0.6875rem] text-outline">{{ m.hero.location }}</div>
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-primary animate-bp-pulse"></span>
              <span class="text-mono text-[0.6875rem] text-primary">{{ m.hero.open }}</span>
            </div>
          </div>
        </div>

        <h1 class="font-headline text-[clamp(2.5rem,5.4vw,4.25rem)] font-semibold leading-[1.02] -tracking-[0.03em] text-on-surface text-pretty">
          {{ m.hero.title[0] }}<br />{{ m.hero.title[1] }}
        </h1>

        <div class="flex items-center gap-3">
          <span class="h-px w-11 bg-primary"></span>
          <span class="text-mono text-xs tracking-[0.12em] text-secondary">{{ m.hero.subtitle }}</span>
        </div>

        <p class="text-[1.0625rem] leading-[1.65] text-on-surface-variant max-w-2xl text-pretty">
          {{ m.hero.bio }}
        </p>

        <div class="flex flex-wrap gap-3 pt-1">
          <NuxtLink
            to="/projects"
            class="inline-flex items-center gap-2.5 px-[1.375rem] py-[0.9375rem] bg-primary hover:bg-primary-container text-on-primary text-mono text-[0.8125rem] font-medium tracking-[0.04em] transition-colors"
          >
            {{ m.hero.viewProjects }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
              <path d="M4 12h15" /><path d="M13 6l6 6-6 6" />
            </svg>
          </NuxtLink>
          <a
            href="#experience"
            class="inline-flex items-center gap-2.5 px-[1.375rem] py-[0.9375rem] border border-outline-variant/70 hover:border-secondary hover:bg-outline-variant/[0.14] text-on-background hover:text-on-surface text-mono text-[0.8125rem] tracking-[0.04em] transition-colors"
          >
            {{ m.hero.experienceLog }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
              <path d="M12 5v14" /><path d="M6 13l6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>

      <!-- detail A — terminal -->
      <div v-reveal class="relative min-w-0 border border-outline-variant/55 bg-background/70">
        <span class="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-outline-variant"></span>
        <span class="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-outline-variant"></span>
        <span class="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-outline-variant"></span>
        <span class="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-outline-variant"></span>

        <div class="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-outline-variant/45 bg-surface-container/90">
          <span class="text-mono text-[0.6875rem] tracking-[0.08em] text-secondary">detail A — system_monitor.go</span>
          <span class="text-mono text-[0.625rem] tracking-[0.1em] text-outline">{{ m.hero.scale }}</span>
        </div>

        <div class="flex text-mono text-[0.8125rem] leading-[1.85]">
          <div class="shrink-0 py-[1.125rem] px-3 text-right text-outline-variant/75 border-r border-outline-variant/[0.28] select-none">
            <div v-for="n in codeLines.length" :key="n">{{ String(n).padStart(2, '0') }}</div>
          </div>
          <div class="flex-1 min-w-0 py-[1.125rem] px-4 overflow-x-auto">
            <div v-for="(line, index) in codeLines" :key="index" class="whitespace-pre" v-html="line"></div>
          </div>
        </div>

        <div class="border-t border-outline-variant/45 px-4 py-3 flex items-center gap-2 text-mono text-xs text-secondary">
          <span class="text-outline">$</span>
          <span class="text-on-background">go run ./cmd/monitor --watch</span>
        </div>

        <div class="border-t border-outline-variant/45 grid grid-cols-2 sm:grid-cols-4">
          <div
            v-for="(stat, index) in m.hero.stats"
            :key="stat.label"
            :class="[
              'px-4 py-3.5 border-outline-variant/[0.28]',
              index < m.hero.stats.length - 1 && 'border-r',
              index < 2 && 'border-b sm:border-b-0'
            ]"
          >
            <div class="text-mono text-[0.625rem] tracking-[0.1em] text-outline mb-1.5">{{ stat.label }}</div>
            <div class="flex items-center gap-1.5 text-mono text-sm" :class="stat.running ? 'text-secondary' : 'text-on-surface'">
              <span v-if="stat.running" class="w-[7px] h-[7px] bg-secondary animate-bp-pulse"></span>
              {{ stat.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const codeLines = [
  '<span class="text-primary">package</span><span class="text-on-background"> main</span>',
  '<span class="text-primary">func</span> <span class="text-secondary">initCoreArchitecture</span><span class="text-on-background">() {</span>',
  '<span class="text-outline">  // warm caches, verify replicas</span>',
  '<span class="text-on-background">  stack := []string{</span><span class="text-secondary">"Go"</span><span class="text-on-background">, </span><span class="text-secondary">"Ruby"</span><span class="text-on-background">, </span><span class="text-secondary">"Postgres"</span><span class="text-on-background">}</span>',
  '<span class="text-on-background">  </span><span class="text-primary">for</span><span class="text-on-background"> _, svc := </span><span class="text-primary">range</span><span class="text-on-background"> stack {</span>',
  '<span class="text-on-background">    deploy.Scale(svc, </span><span class="text-primary">1000</span><span class="text-on-background">)</span>',
  '<span class="text-on-background">  }</span>',
  '<span class="text-on-background">}</span><span class="inline-block w-[7px] h-[15px] ml-1 -mb-0.5 bg-primary animate-bp-blink"></span>'
]

const { m } = useLocale()
</script>
