<script setup>
import { computed, ref } from 'vue'
import BusinessLogo from '../assets/logos/Business logo.svg'
import { businessNetworkJobs } from '../data/businessnetwork'

const searchQuery = ref('')
const openId = ref(null)

const filteredJobs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return businessNetworkJobs
  return businessNetworkJobs.filter((job) => job.title.toLowerCase().includes(query))
})

const resultsCount = computed(() => filteredJobs.value.length)

const selectedJob = computed(() =>
  businessNetworkJobs.find((job) => job.id === openId.value)
)

const toggleOpen = (id) => {
  openId.value = openId.value === id ? null : id
}

const closeDetails = () => {
  openId.value = null
}
</script>

<template>
  <header class="relative min-h-156 w-screen overflow-hidden">
    <!-- Baggrundsvideo (loop bag overlay) -->
    <div class="absolute inset-0">
      <video
        class="absolute left-1/2 top-1/2 h-[120%] w-[220%] -translate-x-1/2 -translate-y-1/2 object-cover"
        autoplay
        muted
        loop
        playsinline
      >
        <source src="/src/assets/videoes/Videoloop2.mp4" type="video/mp4" />
      </video>
    </div>
    <!-- Blå overlay -->
    <div class="absolute w-full h-full bg-primary-darkest/80"></div>
    <!-- Content -->
    <div class="relative z-10 grid grid-cols-12 gap-4 px-8 pt-80 pb-16 w-full">
      <div class="col-start-2 col-end-10 flex flex-col">
      <h1 class="mt-2 text-4xl font-bold text-white sm:text-5xl">Jobportalen</h1>
      <p class="mt-4 max-w-2xl text-lg text-white/90">
        Her kan du finde virksomheder i netvaerket, se samarbejdsmuligheder og tage kontakt til relevante partnere.
      </p>
      </div>
    </div>
  </header>
  <main class="w-full bg-white">
    <section class="grid grid-cols-12 gap-4 px-8 py-10 bg-primary-light/10">
      <div class="col-start-1 col-end-13">
        <div class="flex flex-col gap-4">
          <label class="text-sm font-light text-primary-darkest" for="job-search">Søg efter virksomheder</label>
          <div class="flex w-full items-center gap-3">
            <input
              id="job-search"
              v-model="searchQuery"
              type="text"
              placeholder="Sog efter virksomhed eller titel..."
              class="w-full rounded-full border border-primary-darkest/20 bg-white px-5 py-3 text-primary-darkest shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>
          <p class="uppercase text-sm font-light text-primary-darkest/70">{{ resultsCount }} resultater</p>
        </div>
      </div>
    </section>

    <section class="gap-4 px-8 py-10 bg-primary-light/10">
      <div class="col-start-1 col-end-13">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <article
            v-for="job in filteredJobs"
            :key="job.id"
            class=" border-primary-darkest/10 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div class="flex items-center gap-4">
              <img :src="BusinessLogo" alt="Logo" class="h-12 w-12 rounded-full bg-neutral-light p-2 shrink-0" />
              <div class="min-w-0">
                <h3 class="line-clamp-2 text-base font-semibold text-primary-darkest">{{ job.title }}</h3>
                <p class="text-sm font-light text-primary-darkest/70">{{ job.company }} - {{ job.location }}</p>
              </div>
            </div>
            <div class="mt-4">
              <button
                type="button"
                class="text-sm font-semibold text-primary-darkest hover:text-primary-light"
                @click="toggleOpen(job.id)"
                :aria-expanded="openId === job.id"
              >
                {{ openId === job.id ? 'Skjul detaljer' : 'Læs mere' }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>

  <div
    v-if="selectedJob"
    class="fixed inset-0 z-50 flex items-center justify-center bg-primary-darkest/70 px-6 py-4 overflow-y-auto"
    role="dialog"
    aria-modal="true"
  >
    <div class="w-full max-w-2xl bg-white p-8 shadow-xl my-auto">
      <!-- Header med logo og luk-knap -->
      <div class="flex items-start justify-between gap-6 pb-6 border-b border-primary-darkest/10">
        <div class="flex items-center gap-4">
          <img :src="BusinessLogo" alt="Logo" class="h-16 w-16 rounded-full bg-neutral-light p-2 shrink-0" />
          <div>
            <h2 class="text-2xl font-bold text-primary-darkest">{{ selectedJob.title }}</h2>
            <p class="text-sm font-light text-primary-darkest/70 mt-1">
              {{ selectedJob.company }} • {{ selectedJob.location }}
            </p>
          </div>
        </div>
        <button
          type="button"
          class="text-lg font-semibold text-primary-darkest/70 hover:text-primary-darkest shrink-0"
          @click="closeDetails"
        >
          ✕
        </button>
      </div>

      <!-- Beskrivelse -->
      <div class="mt-6">
        <h3 class="text-sm font-semibold text-primary-darkest/60 uppercase tracking-wide mb-2">Om organisationen</h3>
        <p class="text-base font-light text-primary-darkest/80 leading-relaxed">
          {{ selectedJob.description }}
        </p>
      </div>

      <!-- Fokusområder -->
      <div class="mt-6">
        <h3 class="text-sm font-semibold text-primary-darkest/60 uppercase tracking-wide mb-3">Fokusområder</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(area, index) in selectedJob.focusAreas"
            :key="index"
            class="inline-block rounded-full bg-primary-light/20 px-4 py-2 text-sm font-semibold text-primary-base"
          >
            {{ area }}
          </span>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="mt-8 flex flex-wrap gap-3 pt-6 border-t border-primary-darkest/10">
        <a
          v-if="selectedJob.website && selectedJob.website !== '#'"
          :href="selectedJob.website"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-full bg-primary-darkest px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-base transition"
        >
          Besøg hjemmeside
        </a>
        <button
          type="button"
          class="rounded-full border border-primary-darkest/30 px-6 py-2.5 text-sm font-semibold text-primary-darkest hover:border-primary-darkest transition"
        >
          Kontakt organisation
        </button>
      </div>
    </div>
  </div>
</template>