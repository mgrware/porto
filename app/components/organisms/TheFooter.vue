<template>
  <footer id="contact" class="border-t-2 border-outline-variant/60 bg-background/85">
    <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 lg:pt-12 pb-10 lg:pb-14">
      <div v-reveal class="flex flex-wrap items-end justify-between gap-6 mb-7">
        <div class="min-w-0">
          <div class="text-mono text-[0.6875rem] tracking-[0.14em] text-primary mb-3">TITLE BLOCK</div>
          <h2 class="font-headline text-[clamp(1.625rem,3vw,2.25rem)] font-semibold -tracking-[0.02em] text-on-surface mb-2.5 text-pretty">
            Have a system that needs drawing up?
          </h2>
          <p class="text-base leading-[1.6] text-on-surface-variant max-w-[34rem]">
            Available for senior backend and platform work with remote, cross-functional teams. Reviews, architecture
            audits, and payment-infrastructure builds included.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.link"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-[1.125rem] py-3 border border-outline-variant/70 hover:border-secondary hover:bg-outline-variant/[0.14] text-on-background hover:text-on-surface text-mono text-[0.8125rem] transition-colors"
          >
            <span class="material-symbols-outlined text-base">{{ social.icon }}</span>
            {{ social.label }}
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-outline-variant/50">
        <div
          v-for="field in titleBlock"
          :key="field.label"
          class="border-r border-b border-outline-variant/50 px-4 py-3.5"
        >
          <div class="text-mono text-[0.625rem] tracking-[0.12em] text-outline mb-1.5">{{ field.label }}</div>
          <div class="text-mono text-[0.8125rem]" :class="field.accent ? 'text-primary' : 'text-on-surface'">
            {{ field.value }}
          </div>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 pt-4 text-mono text-[0.6875rem] tracking-[0.06em] text-outline">
        <span>© {{ year }} Gilang Ramadan — all drawings reserved</span>
        <span>Systems Blueprint · rev 03</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

const socials = [
  { label: 'GitHub', icon: 'code', link: 'https://github.com/mgrware' },
  { label: 'LinkedIn', icon: 'business_center', link: 'https://www.linkedin.com/in/mgrdev' }
]

const titleBlock = [
  { label: 'DRAWN BY', value: 'Gilang Ramadan' },
  { label: 'DISCIPLINE', value: 'Backend / platform' },
  { label: 'SCALE', value: '1 : 1' },
  { label: 'DRAWING NO.', value: 'GR-BE-2026-01', accent: true },
  { label: 'REV', value: '03' },
  { label: 'SHEET', value: '1 of 1' }
]
</script>
