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
    period: 'Mar 2022 — Feb 2026',
    role: 'Senior Backend Developer',
    company: 'Virtual Spirit',
    current: false,
    description: [
      'Architected and led the backend development of a large-scale Property Rental System from scratch using Ruby on Rails and PostgreSQL.',
      'Led a team of backend developers, conducting code reviews via Git and providing technical mentorship to newcomers.',
      'Reduced system downtime by 20% through proactive troubleshooting and implementing automated monitoring.',
      'Optimized development workflow by breaking down complex business requirements into actionable technical tasks and leading daily scrum meetings.',
      'Developed custom Metaprogramming modules that significantly improved code efficiency and reduced boilerplate across the system.',
      'Managed end-to-end deployment cycles for staging and production environments, ensuring 99.9% system uptime.',
      'Collaborated cross-functionally with QA, Business Analysts, and Project Managers to ensure on-time delivery of critical features.'
    ],
    tags: ['Ruby on Rails', 'PostgreSQL', 'Metaprogramming', 'Git', 'CI/CD']
  },
  {
    period: 'Nov 2017 — Feb 2022',
    role: 'Backend Engineering Manager',
    company: 'PT Weyland Indonesia Perkasa',
    current: false,
    description: [
      'Managed backend engineering for high-transaction platforms, including Payment Point Online Bank (PPOB) and Food Delivery systems, utilizing Ruby on Rails and MySQL.',
      'Directed the end-to-end lifecycle of application development from initial skeleton design to production launch.',
      'Enhanced transaction reliability and efficiency through the strategic integration of third-party payment and service APIs.',
      'Bridged the gap between technical execution and business goals by reporting directly to the CTO and participating in strategic project discussions.',
      'Facilitated team growth through structured training programs for new developers and rigorous code quality audits.'
    ],
    tags: ['Ruby on Rails', 'MySQL', 'API Integration']
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
    tags: ['Ruby on Rails', 'SQL Server']
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
    tags: ['Laravel', 'MySQL']
  }
]
</script>
