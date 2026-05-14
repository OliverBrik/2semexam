<script setup>
import { computed, ref } from 'vue'
import { allEvents, eventCategories } from '../data/events'

// Holder track af den valgte kategori til filtrering
const selectedCategory = ref('Alle')

// Filtrer events efter valgt kategori
const filteredEvents = computed(() => {
  if (selectedCategory.value === 'Alle') return allEvents
  return allEvents.filter((event) => event.category === selectedCategory.value)
})

// Det fremhævede event er altid det første i de filtrerede resultater
const highlightedEvent = computed(() => filteredEvents.value[0] || null)

// De øvrige events efter det fremhævede (bruges til 2x2 grid under)
const otherEvents = computed(() => filteredEvents.value.slice(1, 5))

// Skifter mellem kategorier når der klikkes på et filter
const selectCategory = (category) => {
  selectedCategory.value = category
}
</script>

<template>
  <div class="p-0! bg-[#f3f5f8] text-primary-darkest">
    <!-- Hero-sektion: Events-header med baggrundsbillede og overlay -->
    <section
      class="relative min-h-156 w-screen overflow-hidden bg-primary-darkest"
      style="margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw);"
    >
      <div
        class="absolute inset-0 bg-cover bg-center opacity-45"
        style="background-image: url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80')"
      ></div>
      <div class="absolute inset-0 bg-linear-to-r from-primary-darkest via-primary-darkest/80 to-primary-darkest/40"></div>

      <div class="absolute inset-0 z-10 flex items-end">
        <div class="grid w-full grid-cols-12 gap-4 px-8 pb-16 lg:pb-20">
          <div class="col-span-12 flex flex-col justify-end text-neutral-light lg:col-span-8 lg:col-start-2">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-light/70">Business Region</p>
            <h1 class="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">Kommende Events</h1>
            <p class="mt-5 max-w-2xl text-sm leading-7 text-neutral-light/85 sm:text-base">
              Deltag i vores events og workshops for at møde andre virksomheder, få ny viden og bygge netværk på tværs af grænseregionen.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sektion med filter og events -->
    <section class="w-full px-8 py-12">
      <div class="grid grid-cols-12 gap-8">
        <!-- Venstre side: Filter -->
        <aside class="flex justify-start col-span-12 lg:col-span-4 lg:col-start-1">
          <div class="sticky top-24">
            <h2 class="mb-6 text-sm font-semibold text-primary-darkest uppercase tracking-widest">Filter</h2>


            <!-- Kategori filterknapper -->
            <div>
              <h3 class="mb-3 text-xs font-medium text-primary-darkest/70 uppercase tracking-wide">Kategori</h3>
              <div class="space-y-2 flex flex-col justify-start">
                <button
                  v-for="category in eventCategories"
                  :key="category"
                  type="button"
                  class="flex items-center gap-3 px-9 py-2 text-sm transition-all duration-200 w-full"
                  :class="
                    selectedCategory === category
                      ? 'bg-primary-darkest text-neutral-light font-medium'
                      : 'bg-white border border-primary-darkest/10 text-primary-darkest hover:bg-primary-light/10'
                  "
                  @click="selectCategory(category)"
                >
                  <span
                    class="h-2 w-2 shrink-0"
                    :class="selectedCategory === category ? 'bg-neutral-light' : 'bg-primary-base'"
                  ></span>
                  <span>{{ category }}</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- Højre side: Fremhævet event + andre events -->
        <div class="col-span-12 lg:col-span-8">
          <!-- Fremhævet event -->
          <article
            v-if="highlightedEvent"
            class="relative mb-8 overflow-hidden bg-cover bg-center shadow-lg"
            :style="{ backgroundImage: `url(${highlightedEvent.image})` }"
          >
            <div class="absolute inset-0 bg-linear-to-b from-primary-darkest/20 to-primary-darkest/70"></div>
            <div class="relative z-10 flex h-80 flex-col justify-end p-8">
              <p class="text-xs uppercase tracking-[0.2em] text-neutral-light/80">{{ highlightedEvent.category }}</p>
              <h3 class="mt-3 text-3xl font-semibold text-neutral-light">{{ highlightedEvent.title }}</h3>
              <p class="mt-4 max-w-xl text-sm leading-6 text-neutral-light/90">{{ highlightedEvent.description }}</p>
              <div class="mt-4 flex items-center gap-4 text-xs text-neutral-light/80">
                <span> {{ highlightedEvent.location }}</span>
                <span> {{ new Date(highlightedEvent.date).toLocaleDateString('da-DK') }}</span>
                <span> {{ highlightedEvent.attendees }} deltagere</span>
              </div>
            </div>
          </article>

          <!-- 2x2 grid med øvrige events -->
          <div class="grid gap-6 sm:grid-cols-2">
            <article
              v-for="event in otherEvents"
              :key="event.id"
              class="group overflow-hidden border border-primary-darkest/10 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                class="relative h-48 w-full overflow-hidden bg-cover bg-center"
                :style="{ backgroundImage: `url(${event.image})` }"
              >
                <div class="absolute inset-0 bg-linear-to-b from-primary-darkest/10 to-primary-darkest/40"></div>
                <p class="absolute right-3 top-3 inline-block bg-primary-darkest px-3 py-1 text-xs font-semibold uppercase text-neutral-light">
                  {{ event.category }}
                </p>
              </div>

              <div class="p-5">
                <h4 class="text-base font-semibold text-primary-darkest">{{ event.title }}</h4>
                <p class="mt-2 line-clamp-2 text-sm text-primary-darkest/70">{{ event.description }}</p>

                <div class="mt-4 space-y-1 text-xs text-primary-darkest/60">
                  <p> {{ event.location }}</p>
                  <p> {{ new Date(event.date).toLocaleDateString('da-DK') }} kl. {{ event.time }}</p>
                </div>

                <button
                  type="button"
                  class="mt-4 inline-block border border-primary-darkest bg-transparent px-4 py-2 text-xs font-semibold text-primary-darkest transition-colors hover:bg-primary-light hover:text-neutral-light"
                >
                  Læs mere
                </button>
              </div>
            </article>

            <!-- Hvis der ikke er nok events til at fylde gridet -->
            <div v-if="otherEvents.length === 0" class="col-span-full py-8 text-center text-primary-darkest/60">
              <p>Ingen events tilgængelige i denne kategori.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
