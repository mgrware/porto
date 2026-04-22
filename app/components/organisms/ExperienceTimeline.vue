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
      'Architected and led the backend development of a large-scale Property Rental System from scratch using Ruby on Rails and PostgreSQL.',
      'Led a team of backend developers, conducting code reviews via Git and providing technical mentorship to newcomers.',
      'Reduced system downtime by 20% through proactive troubleshooting and implementing automated monitoring.',
      'Optimized development workflow by breaking down complex business requirements into actionable technical tasks and leading daily scrum meetings.',
      'Developed custom Metaprogramming modules that significantly improved code efficiency and reduced boilerplate across the system.',
      'Managed end-to-end deployment cycles for staging and production environments, ensuring 99.9% system uptime.',
      'Collaborated cross-functionally with QA, Business Analysts, and Project Managers to ensure on-time delivery of critical features.'
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
      'Managed backend engineering for high-transaction platforms, including Payment Point Online Bank (PPOB) and Food Delivery systems, utilizing Ruby on Rails and MySQL.',
      'Directed the end-to-end lifecycle of application development from initial skeleton design to production launch.',
      'Enhanced transaction reliability and efficiency through the strategic integration of third-party payment and service APIs.',
      'Bridged the gap between technical execution and business goals by reporting directly to the CTO and participating in strategic project discussions.',
      'Facilitated team growth through structured training programs for new developers and rigorous code quality audits'
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
