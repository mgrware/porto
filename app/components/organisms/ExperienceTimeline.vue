<template>
  <section id="experience" class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
    <SheetHeading sheet="03" title="Experience" note="Elevation view — most recent position at the top." />

    <div class="relative pl-3 sm:pl-6">
      <div class="absolute left-0 top-1.5 bottom-1.5 border-l border-dashed border-outline-variant/75"></div>
      <div class="absolute left-[-4px] top-0 w-[9px] h-px bg-outline-variant"></div>
      <div class="absolute left-[-4px] bottom-0 w-[9px] h-px bg-outline-variant"></div>

      <div class="flex flex-col gap-8">
        <div v-for="exp in experiences" :key="exp.company" v-reveal class="relative min-w-0">
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

const experiences = [
  {
    period: 'Feb 2026 — present',
    role: 'Founder & Lead Engineer',
    company: 'PT Giradia Solusi Digital',
    current: true,
    description: [
      'Founded and lead end-to-end architecture as sole engineer for Bati, an offline-first, multi-tenant POS SaaS platform for Indonesian SMEs (UMKM) — full-stack ownership across backend (NestJS, Prisma, PostgreSQL, Redis, BullMQ, Traefik), mobile (Flutter), and admin dashboard (React).',
      'Designed an offline-first sync engine — outbox pattern with client-generated UUIDv7 idempotency keys and event-sourced inventory and cash ledgers — enabling reliable multi-cashier, multi-outlet operation with zero data loss under intermittent connectivity.',
      'Architected a flexible entitlement and monetization system spanning Free/Pro tiers plus recurring and one-time à la carte add-ons across 40+ feature flags, unified through shared backend/mobile/admin gating contracts so pricing-model changes require no application logic rewrites.',
      'Built and normalized a 56,000+ SKU master product catalog from multiple public retail datasets, powering barcode-scan product prefill to reduce merchant onboarding friction.'
    ],
    tags: ['NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'BullMQ', 'Traefik', 'Flutter', 'React']
  },
  {
    period: 'Mar 2022 — Feb 2026',
    role: 'Senior Backend Developer',
    company: 'Virtual Spirit',
    current: true,
    description: [
      'Architected core domain layer using Interactor and Organizer patterns, decoupling business logic from Rails models and controllers — established a maintainable foundation that cut PR review time by ~30% and contained regression risk in payment-critical flows as the codebase grew.',
      'Established the testing foundation from the ground up using RSpec, reaching 78% coverage across 13 service domains with CI-gated unit, integration, and request specs on all payment and auth paths.',
      'Engineered end-to-end marketplace payment infrastructure on Stripe API and Stripe Connect, implementing destination charges, split payments, Connect Express onboarding, webhook idempotency, and dispute handling — production-ready for multi-party payouts at scale.',
      'Built automated payout routing pipeline distributing rental payments from tenants to landlords with platform fee capture, eliminating manual reconciliation and providing a same-day payout SLA from day one of launch.',
      'Designed escrow and subscription billing engine supporting recurring charges, hold-and-release flows, and KYC-gated activation for professional service bookings across multiple pricing tiers.',
      'Implemented real-time messaging layer with AnyCable on Ruby on Rails for in-app chat and live notifications, benchmarked to sustain 1,000+ concurrent WebSocket connections at p95 <100ms — chosen over ActionCable to cut server memory footprint by ~60% and remove a known scaling ceiling before it became a problem.',
      'Eliminated N+1 query patterns and refactored heavy ActiveRecord associations using includes, preload, and counter caches; combined with Redis caching and targeted PostgreSQL indexing to drop p95 endpoint latency from 800ms to <150ms across core read paths.',
      'Built backend framework for an internal social-graph engine — feed generation, listing publication, and portfolio surfacing — with cursor-based pagination and Redis-backed activity feeds designed to scale horizontally as content volume grows.',
      'Containerized full application stack with Docker and Docker Compose, achieving dev/staging/production parity and cutting new-engineer onboarding from 2 days to under 4 hours.',
      'Partnered with distributed cross-functional teams (Frontend, UI/UX, Product) across timezones using Git Flow, code review standards, and Agile/Scrum ceremonies; maintained a zero-rollback release record across the platform\'s first year in production.'
    ],
    tags: ['Ruby on Rails', 'PostgreSQL', 'Stripe Connect', 'AnyCable', 'Redis', 'RSpec', 'Docker', 'CI/CD']
  },
  {
    period: 'Nov 2017 — Feb 2022',
    role: 'Backend Engineering Manager',
    company: 'PT Weyland Indonesia Perkasa',
    current: false,
    description: [
      'Owned backend architecture for a fintech super-app spanning 7 core service domains and 21+ sub-services — bill payments (PPOB), top-up, QRIS, e-money, ticketing, transfers, and school cashless — reaching Rp 8.6B+ in monthly transaction volume and 181,000+ transactions/month within two years of launch.',
      'Sustained 1,000 TPS at 99.9% uptime during peak utility payment cycles and ticketing rushes through load balancing on Nginx and AWS ALB, horizontal scaling of stateless services, and proactive bottleneck mitigation before incidents surfaced.',
      'Led monolith-to-microservices migration, decomposing tightly-coupled billing and ticketing flows into independently deployable services — eliminated cross-domain deploy contention and improved fault isolation across a platform serving 11,000+ registered agents and end-users.',
      'Designed a shared integration layer standardizing auth, idempotency, and retry logic across 10+ third-party providers (Finnet/Finpay, Tiket.com, Infobip, and others) — each with its own contract and failure mode, abstracted behind a unified internal interface.',
      'Post-promotion, led backend for AtozGO — a new on-demand delivery super-app (food, express courier, e-commerce, cleaning, pre-order, mall) built as a net-new product line serving Greater Jakarta, reaching 154,000+ monthly transactions at 92% delivery success rate and Rp 3.76B GMV within months of launch.',
      'Designed multi-sided order routing and dispatch engine across 9 service domains with real-time push notifications via FCM and OTP delivery with automatic InfoBip → local SMS fallback, ensuring deliverability under third-party outages with zero manual intervention.',
      'Promoted from Senior Backend Developer to Engineering Manager after 2 years — given full ownership of technology direction, architecture decisions, and an 8-person engineering org (5 BE, 2 QA, 1 SA) while continuing hands-on backend development.'
    ],
    tags: ['Ruby on Rails', 'Golang', 'Laravel', 'MySQL', 'Nginx', 'AWS', 'CI/CD']
  },
  {
    period: 'Oct 2015 — Dec 2017',
    role: 'Backend Developer',
    company: 'Walden Global Services',
    current: false,
    description: [
      'Developed and maintained the Nutrifood Shipping Export & Import system using Ruby on Rails and SQL Server.',
      'Improved data management efficiency by implementing database best practices and optimizing complex SQL queries.',
      'Served as a technical lead for specific sprints, managing SOW estimations, milestones, and developer assignments.',
      'Authored core application skeletons and shared libraries to be utilized by the wider development team to ensure consistency.'
    ],
    tags: ['Ruby on Rails', 'SQL Server', 'Stored procedures']
  },
  {
    period: 'Jan 2014 — Aug 2015',
    role: 'Backend Developer',
    company: 'Politeknik Piksi Ganesha',
    current: false,
    description: [
      'Built a comprehensive Certification Management System using Laravel and MySQL.',
      'Translated complex business requirements into functional product features while maintaining platform stability.'
    ],
    tags: ['Laravel', 'MySQL', 'jQuery']
  }
]
</script>
