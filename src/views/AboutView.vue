<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import InterregLogo from '../assets/logos/Interreg-Logo_business-de-dk.png'

const { t, locale } = useI18n()

const videoIds = {
  en: 'plGUimVaDs0',
  de: '140ipk4m370',
  da: 'tXlboRdeSNY',
}

const videoUrl = computed(() => {
  const loc = (locale.value || '').toString().toLowerCase()
  let id = videoIds.en
  if (loc.startsWith('da') || loc === 'dk') id = videoIds.da
  else if (loc.startsWith('de') || loc === 'ger' || loc === 'de-de') id = videoIds.de
  else if (loc.startsWith('en')) id = videoIds.en
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`
})

const formspreeAction = import.meta.env.VITE_FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_FORM_ID}`
  : 'https://formspree.io/f/your-form-id'
import { employees } from '../data/employees'
</script>

<template>
  <div class="p-0! bg-[#f3f5f8] text-primary-darkest">
    <!-- Hero-sektion: Om os-header i fuld bredde med baggrundsbillede -->
    <section
      class="relative min-h-156 w-screen overflow-hidden bg-primary-darkest"
      style="margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw);"
    >
      <div
        class="absolute inset-0 bg-cover bg-center opacity-45"
        style="background-image: url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80')"
      ></div>
      <div class="absolute inset-0 bg-linear-to-r from-primary-darkest via-primary-darkest/80 to-primary-darkest/40"></div>

      <div class="relative z-10 grid grid-cols-12 gap-4 px-8 pt-60 pb-16 lg:pb-20 w-full">
          <div class="col-span-12 flex flex-col text-neutral-light lg:col-span-8 lg:col-start-2">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-light/70">{{ $t('about.subtitle') }}</p>
          <h1 class="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl text-white">{{ $t('about.title') }}</h1>
          <p class="mt-5 max-w-2xl text-sm leading-7 text-neutral-light/85 sm:text-base">
            {{ $t('about.description') }}
          </p>
          </div>
        </div>
    </section>

    <!-- Video (sprog-specifik): responsiv embed -->
    <section class="mt-8 w-full px-8 lg:mt-10">
      <div class="grid grid-cols-12">
        <div class="col-span-12 lg:col-start-2 lg:col-span-10">
          <div class="relative" style="padding-bottom:56.25%;height:0;overflow:hidden;">
            <iframe :src="videoUrl" :title="$t('about.title')" class="absolute top-0 left-0 w-full h-full" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- Kontakt og vision: formular til venstre og tekst om siden til højre -->
    <section class="mt-10 w-full px-8 pb-10 lg:mt-14">
      <div class="grid grid-cols-12 gap-8 xl:gap-12">
        <aside class="col-span-12 bg-[#6f7e92] p-5 text-neutral-light shadow-2xl lg:col-span-4 lg:col-start-2">
          <h2 class="text-center text-2xl font-light">{{ $t('about.contactUs') }}</h2>

          <form class="mt-5 space-y-4" :action="formspreeAction" method="POST">
            <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />

            <div class="space-y-2">
              <label class="text-sm font-light" for="about-name">{{ $t('contact.name') }}</label>
              <input
                id="about-name"
                name="name"
                type="text"
                :placeholder="$t('contact.name')"
                class="w-full border-b border-neutral-light/50 bg-transparent px-0 py-2 text-sm text-neutral-light placeholder:text-neutral-light/55 focus:border-neutral-light focus:outline-none"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-light" for="about-email">{{ $t('contact.email') }}</label>
              <input
                id="about-email"
                name="email"
                type="email"
                :placeholder="$t('contact.email')"
                class="w-full border-b border-neutral-light/50 bg-transparent px-0 py-2 text-sm text-neutral-light placeholder:text-neutral-light/55 focus:border-neutral-light focus:outline-none"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-light" for="about-message">{{ $t('contact.message') }}</label>
              <textarea
                id="about-message"
                name="message"
                rows="7"
                :placeholder="$t('contact.message')"
                class="w-full resize-none border border-neutral-light/45 bg-[#5d6d82] px-3 py-2 text-sm text-neutral-light placeholder:text-neutral-light/55 focus:border-neutral-light focus:outline-none"
              ></textarea>
            </div>

            <div class="flex flex-wrap gap-4 pt-1 text-sm font-light">
              <label class="flex items-center gap-2">
                <input type="radio" name="type" value="virksomhed" class="accent-primary-darkest" />
                {{ $t('contact.company') }}
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" name="type" value="individual" class="accent-primary-darkest" />
                {{ $t('contact.private') }}
              </label>
            </div>

            <button
              type="submit"
              class="mt-2 w-full bg-neutral-light px-4 py-2 text-sm font-medium text-primary-darkest transition-colors duration-300 hover:bg-primary-light hover:text-neutral-light"
            >
              {{ $t('contact.send') }}
            </button>
          </form>
        </aside>

        <article class="col-span-12 flex flex-col h-full bg-white shadow-sm lg:col-span-6 lg:col-start-7  lg:px-10 lg:py-6 xl:col-span-6 xl:col-start-6">
          <h2 class="mt-2 text-3xl font-semibold tracking-tight text-primary-darkest sm:text-4xl">{{ $t('about.vision') }}</h2>
          <div class="mt-6 space-y-5 text-base leading-7 text-primary-darkest/90">
            <p>
                {{ $t('about.visionText') }}
            </p>
        <div class="mt-4 space-y-5 text-base leading-7 text-primary-darkest/90">
            <p>
                {{ $t('about.visionText2') }}
            </p>
          <a
            href="https://www.interreg-de-dk.eu/dk/projekter-og-resultater/vores-projekter/enkeltvisning-projekter/business-de-dk/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium text-primary-darkest hover:underline"
          >
            {{ $t('about.readMore') }}
          </a>
        </div>
          </div>

          <div class="mt-auto flex justify-end">
            <img :src="InterregLogo" alt="Interreg logo" class="h-12 w-auto" loading="lazy" decoding="async" />
          </div>
        </article>
      </div>
    </section>

    <!-- Medarbejdere: oversigt over teamet i kort med billede og kontaktinfo -->
    <section class="w-full px-8 pb-16">
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12 mb-1 lg:col-start-2 lg:col-end-12">
          <div class="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 class="mt-2 text-3xl font-semibold text-primary-darkest">{{ $t('about.employees') }}</h2>
            </div>
          </div>
        </div>

        <div class="col-span-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 lg:col-start-2 lg:col-end-12">
          <article
            v-for="employee in employees"
            :key="employee.name + employee.phone"
            class="flex flex-col overflow-hidden bg-primary-darkest text-neutral-light shadow-lg transition-transform duration-300 hover:-translate-y-1"
          >
            <img :src="employee.image" :alt="employee.name" class="h-52 w-full object-cover object-center" loading="lazy" decoding="async" />
            <div class="flex flex-col flex-1 p-4 text-center">
              <h3 class="text-base font-semibold leading-6">{{ employee.name }}</h3>
              <p class="mt-1 text-sm text-neutral-light/85">{{ employee.role }}</p>
              <p class="mt-3 text-xs text-neutral-light/85">{{ employee.phone }}</p>
              <p class="text-xs text-neutral-light/70">{{ employee.email }}</p>
              <p v-if="employee.description" class="mt-3 mb-4 text-xs uppercase tracking-[0.18em] text-neutral-light/55">{{ employee.description }}</p>
              <!-- LinkedIn button removed -->
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
