<template>
  <section id="experience" class="px-8 lg:px-16 py-20 bg-background border-b border-surface-container-high">
    <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <div>
        <h2 class="font-headline text-3xl font-bold uppercase tracking-tight mb-2">Professional_Experience</h2>
        <p class="text-on-surface-variant font-body">Deployment history and system milestones</p>
      </div>
      <div class="h-px flex-1 bg-outline-variant/20 mx-8 hidden md:block"></div>
      <div class="text-mono text-xs text-secondary font-bold tracking-widest">LOG_ENTRIES.V1</div>
    </div>

    <div class="space-y-12 relative">
      <!-- Timeline Vertical Line -->
      <div class="absolute left-0 md:left-40 top-0 bottom-0 w-px bg-outline-variant/20"></div>
      
      <div 
        v-for="exp in experiences" 
        :key="exp.company"
        class="relative flex flex-col md:flex-row gap-8 md:gap-16"
      >
        <div class="md:w-32 pt-1 text-right">
          <span class="text-mono text-xs text-primary font-bold">{{ exp.period }}</span>
        </div>
        
        <div 
          :class="[
            'absolute left-[-4px] md:left-[156px] w-2 h-2 rounded-none border border-background',
            exp.active ? 'bg-primary shadow-[0_0_10px_rgba(156,255,147,0.5)]' : 'bg-primary/40'
          ]"
        ></div>
        
        <div class="flex-1 bg-surface-container-low p-6 border border-outline-variant/10 hover:border-primary/30 transition-colors">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-headline text-xl font-bold uppercase text-on-surface">{{ exp.role }}</h3>
              <p class="text-secondary font-mono text-xs uppercase tracking-widest">{{ exp.company }}</p>
            </div>
            <BaseIcon class="text-primary/40">{{ exp.icon }}</BaseIcon>
          </div>
          <ul class="font-body text-on-surface-variant text-sm leading-relaxed mb-6 space-y-2">
            <li 
              v-for="(desc, idx) in exp.description" 
              :key="idx"
              class="flex gap-3 items-start group"
            >
              <span class="mt-1.5 w-1.5 h-1.5 bg-primary/40 group-hover:bg-primary transition-colors flex-shrink-0"></span>
              <span class="text-on-surface-variant group-hover:text-on-surface transition-colors">{{ desc }}</span>
            </li>
          </ul>
          <div class="flex flex-wrap gap-2">
            <BaseBadge 
              v-for="tag in exp.tags" 
              :key="tag" 
              variant="surface"
            >
              {{ tag }}
            </BaseBadge>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'
import BaseBadge from '../atoms/BaseBadge.vue'

const experiences = [
  {
    period: 'Mar 2022 — Feb 2026',
    role: 'Senior Backend Developer',
    company: 'VIRTUAL SPIRIT',
    icon: 'dns',
    active: true,
    description: [
      'Architected core domain layer using Interactor and Organizer patterns, decoupling business logic from Rails models and controllers — established a maintainable foundation that cut PR review time by ~30% and contained regression risk in payment-critical flows as the codebase grew.',
      'Established the testing foundation from the ground up using RSpec, reaching 78% coverage across 13 service domains with CI-gated unit, integration, and request specs on all payment and auth paths.',
      'Engineered end-to-end marketplace payment infrastructure on Stripe API and Stripe Connect, implementing destination charges, split payments, Connect Express onboarding, webhook idempotency, and dispute handling — production-ready for multi-party payouts at scale.',
      'Built automated payout routing pipeline distributing rental payments from tenants to landlords with platform fee capture, eliminating manual reconciliation and providing a same-day payout SLA from day one of launch.',
      'Designed escrow and subscription billing engine supporting recurring charges, hold-and-release flows, and KYC-gated activation for professional service bookings across multiple pricing tiers.',
      'Implemented real-time messaging layer with AnyCable on Ruby on Rails for in-app chat and live notifications, benchmarked to sustain 1,000+ concurrent WebSocket connections at p95 <100ms — chosen over ActionCable to cut server memory footprint by ~60% and remove a known scaling ceiling before it became a problem.',
      'Eliminated N+1 query patterns and refactored heavy ActiveRecord associations using includes, preload, and counter caches; combined with Redis caching and targeted PostgreSQL  indexing to drop p95 endpoint latency from 800ms to <150ms across core read paths.',
      'Built backend framework for an internal social-graph engine — feed generation, listing publication, and portfolio surfacing — with cursor-based pagination and Redis-backed activity feeds designed to scale horizontally as content volume grows.',
      'Containerized full application stack with Docker and Docker Compose, achieving dev/staging/production parity and cutting new-engineer onboarding from 2 days to under 4 hours.',
      'Partnered with distributed cross-functional teams (Frontend, UI/UX, Product) across timezones using Git Flow, code review standards, and Agile/Scrum ceremonies; maintained a zero-rollback release record across the platform\'s first year in production.'
    ],
    tags: ['RUBY_ON_RAILS', 'POSTGRESQL', 'NODE_JS', 'MONGO_DB', 'GOLANG', 'CI/CD', 'DOCKER', 'JAVASCRIPT']
  },
  {
    period: 'Nov 2017 — Feb 2022',
    role: 'Backend Engineering Manager',
    company: 'PT WEYLAND INDONESIA PERKASA',
    icon: 'terminal',
    active: false,
    description: [
      'Owned backend architecture for a fintech super-app spanning 7 core service domains and 21+ sub-services — bill payments (PPOB), top-up, QRIS, e-money, ticketing, transfers, and school cashless — reaching Rp 8.6B+ in monthly transaction volume and 181,000+ transactions/month within two years of launch.',
      'Sustained 1,000 TPS at 99.9% uptime during peak utility payment cycles and ticketing rushes through load balancing on Nginx and AWS ALB, horizontal scaling of stateless services, and proactive bottleneck mitigation before incidents surfaced.',
      'Led monolith-to-microservices migration, decomposing tightly-coupled billing and ticketing flows into independently deployable services — eliminated cross-domain deploy contention and improved fault isolation across a platform serving 11,000+ registered agents and end-users.',
      'Designed a shared integration layer standardizing auth, idempotency, and retry logic across 10+ third-party providers (Finnet/Finpay, Tiket.com, Infobip, and others) — each with its own contract and failure mode, abstracted behind a unified internal interface.',
      'Post-promotion, led backend for AtozGO — a new on-demand delivery super-app (food, express courier, e-commerce, cleaning, pre-order, mall) built as a net-new product line serving Greater Jakarta, reaching 154,000+ monthly transactions at 92% delivery success rate and Rp 3.76B GMV within months of launch.',
      'Designed multi-sided order routing and dispatch engine across 9 service domains with real-time push notifications via FCM and OTP delivery with automatic InfoBip → local SMS fallback, ensuring deliverability under third-party outages with zero manual intervention.',
      'Promoted from Senior Backend Developer to Engineering Manager after 2 years — given full ownership of technology direction, architecture decisions, and an 8-person engineering org (5 BE, 2 QA, 1 SA) while continuing hands-on backend development.'
    ],
    tags: ['RUBY_ON_RAILS', 'MYSQL', 'GOLANG', 'LARAVEL', 'CI/CD', 'JAVASCRIPT']
  },
  {
    period: 'Oct 2015 — Dec 2017',
    role: 'Backend Developer',
    company: 'WALDEN GLOBAL SERVICES',
    icon: 'memory',
    active: false,
    description: [
      'Developed and maintained the Nutrifood Shipping Export & Import system using Ruby on Rails and SQL Server.',
      'Improved data management efficiency by implementing database best practices and optimizing complex SQL queries.',
      'Served as a technical lead for specific sprints, managing SOW estimations, milestones, and developer assignments.',
      'Authored core application skeletons and shared libraries to be utilized by the wider development team to ensure consistency.'
    ],
    tags: ['RUBY_ON_RAILS', 'SQL_SERVER', 'STORE_PROCEDURE']
  },
  {
    period: 'Jan 2014 — Aug 2015',
    role: 'Backend Developer',
    company: ' POLITEKNIK PIKSI GANESHA',
    icon: 'memory',
    active: false,
    description: [
      'Built a comprehensive Certification Management System using Laravel and MySQL.',
      'Translated complex business requirements into functional product features while maintaining platform stability.'
    ],
    tags: ['LARAVEL', 'MYSQL', 'JQUERY']
  }
]
</script>
