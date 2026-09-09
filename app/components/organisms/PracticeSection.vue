<template>
  <section id="architecture" class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <SheetHeading sheet="04" title="How I build" note="Notes and standards applied across every drawing." />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
      <div v-reveal class="flex flex-col gap-5 min-w-0">
        <p class="text-[1.0625rem] leading-[1.65] text-on-surface-variant text-pretty">
          I treat a backend like a set of drawings: explicit contracts, dimensions you can check, and a revision
          history anyone can read. Domain logic sits in interactors rather than models, money paths are idempotent by
          construction, and every service ships with the telemetry needed to prove it works.
        </p>

        <div class="border-t border-outline-variant/50">
          <div
            v-for="principle in principles"
            :key="principle.code"
            class="flex gap-4 py-4 border-b border-outline-variant/50 min-w-0"
          >
            <span class="text-mono text-[0.6875rem] text-primary shrink-0 pt-[0.1875rem]">{{ principle.code }}</span>
            <div class="min-w-0">
              <div class="font-headline text-[0.9375rem] font-semibold text-on-surface mb-1">{{ principle.title }}</div>
              <div class="text-sm leading-[1.55] text-on-surface-variant">{{ principle.body }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- detail B — request path -->
      <div v-reveal class="relative min-w-0 border border-outline-variant/55 bg-background/60 p-5">
        <div class="flex items-center justify-between gap-4 mb-5">
          <span class="text-mono text-[0.6875rem] tracking-[0.1em] text-secondary">detail B — request path</span>
          <span class="text-mono text-[0.625rem] tracking-[0.1em] text-outline">NTS</span>
        </div>

        <div class="flex flex-col">
          <div v-for="node in nodes" :key="node.code" class="min-w-0">
            <div class="flex items-center gap-3.5 border border-outline-variant/60 px-3.5 py-3 bg-surface-container/75">
              <span class="text-mono text-[0.625rem] text-primary shrink-0">{{ node.code }}</span>
              <span class="text-mono text-[0.8125rem] text-on-surface min-w-0 truncate">{{ node.label }}</span>
              <span class="flex-1 h-px bg-outline-variant/40"></span>
              <span class="text-mono text-[0.6875rem] text-outline shrink-0">{{ node.meta }}</span>
            </div>
            <div class="h-[18px] w-px ml-6 border-l border-dashed border-outline-variant/70"></div>
          </div>
          <div class="flex items-center gap-2.5 text-mono text-[0.6875rem] text-outline">
            <span class="w-2.5 h-2.5 border border-primary rotate-45 ml-[1.125rem]"></span>
            observable at every hop
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SheetHeading from '../molecules/SheetHeading.vue'

const principles = [
  {
    code: 'N1',
    title: 'Contracts before code',
    body: 'Interactor and organizer patterns keep domain logic out of models and controllers, so behaviour is testable in isolation.'
  },
  {
    code: 'N2',
    title: 'Money paths are idempotent',
    body: 'Webhook keys, outbox tables, and event-sourced ledgers — retries never double-charge or double-pay.'
  },
  {
    code: 'N3',
    title: 'Measured, not assumed',
    body: 'p95 budgets per endpoint, tracing on every hop, and dashboards that a non-engineer can read.'
  },
  {
    code: 'N4',
    title: 'Tests as a foundation',
    body: 'RSpec suites gated in CI on all payment and auth paths, built from the first commit rather than retrofitted.'
  }
]

const nodes = [
  { code: '01', label: 'edge / load balancer', meta: 'nginx · alb' },
  { code: '02', label: 'api service', meta: 'rails · go' },
  { code: '03', label: 'domain interactors', meta: 'idempotent' },
  { code: '04', label: 'queue & workers', meta: 'sidekiq · bullmq' },
  { code: '05', label: 'postgres + redis', meta: 'replica · cache' }
]
</script>
