<script setup>
import { computed, ref } from 'vue'
import { allNews } from '../data/news.js'

// Holder track af hvilken nyhed der vises i karusellens center
const currentIndex = ref(0)

// Søgeboks til nyheds-listen
const searchQuery = ref('')

// Den aktuelle nyhed i midten af karusellen
const highlightedNews = computed(() => allNews[currentIndex.value])

// De to nyheder ved siden af den fremhævede
const sideNews = computed(() => {
  if (allNews.length < 2) return []

  // Finder forrige og næste nyhed i en cirkel
  const prevIndex = (currentIndex.value - 1 + allNews.length) % allNews.length
  const nextIndex = (currentIndex.value + 1) % allNews.length

  return [allNews[prevIndex], allNews[nextIndex]]
})

// Filtrerede og sorterede nyheder til listen under
const filteredNews = computed(() => {
  let filtered = allNews.filter((news) =>
    news.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    news.summary.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    news.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  // Sorter efter nyeste først (omvendt rækkefølge)
  return filtered.reverse()
})

// Skifter til nyheden til venstre
const previousNews = () => {
  const left = sideNews.value[0]
  if (left) {
    setCurrent(left.id)
  } else {
    currentIndex.value = (currentIndex.value - 1 + allNews.length) % allNews.length
  }
}

// Skifter til nyheden til højre
const nextNews = () => {
  const right = sideNews.value[1]
  if (right) {
    setCurrent(right.id)
  } else {
    currentIndex.value = (currentIndex.value + 1) % allNews.length
  }
}

// Sætter karusellen til en valgt nyhed
const setCurrent = (id) => {
  const idx = allNews.findIndex((n) => n.id === id)
  if (idx !== -1) currentIndex.value = idx
}
</script>

<template>
  <main class="news-page !p-0">
    <!-- Hero-sektion: Side-header med baggrundsbillede -->
    <section class="relative min-h-156 w-screen overflow-hidden bg-primary-darkest" style="margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw);">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80')"
      ></div>
      <div class="absolute inset-0 bg-primary-darkest/80"></div>

      <div class="absolute inset-0 z-10 flex items-end">
        <div class="grid w-full grid-cols-12 gap-4 px-8 pb-16 lg:pb-20">
          <div class="col-span-12 flex flex-col justify-end text-neutral-light lg:col-span-8 lg:col-start-2">
            <p class="text-sm font-semibold uppercase text-white/80">Nyheder & indsigter</p>
            <h1 class="mt-2 text-4xl font-bold text-white sm:text-5xl">
              Projektets fremdrift, erfaringer og resultater samlet ét sted
            </h1>
            <p class="mt-4 max-w-2xl text-lg text-white/90">
              Her deler vi opdateringer fra projektet, indsigter fra arbejdet i grænseregionen og de vigtigste
              resultater, så man hurtigt kan se, hvad der sker og hvorfor det betyder noget.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Karussel: Fremhævet nyhed i midten med navigationspile -->
    <section class="w-screen mb-12 overflow-x-hidden" style="margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw);">
      <div class="pt-10">
        <!-- Karussel-titel -->
        <div class="grid grid-cols-12 gap-4 mx-auto max-w-full mb-6 px-8">
          <div class="col-start-2 col-end-11">
            <h2 class="text-2xl font-light text-primary-darkest sm:text-3xl">De vigtigste nyheder</h2>
          </div>
        </div>

        <!-- Karussel med navigationspile -->
        <div class="grid grid-cols-12 gap-4 py-8 mx-auto max-w-full">
        <div class="col-start-1 col-end-13 relative">
          <div class="px-20">
            <!-- Karussel-kort: venstre, center (fremhævet), højre -->
            <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-[1fr_2fr_1fr]">
              <article
                v-if="sideNews[0]"
                class="relative overflow-hidden bg-cover bg-center rounded transition-all duration-220 hover:scale-105 hover:-translate-y-1 min-h-56 z-10 cursor-pointer"
                :style="{ backgroundImage: `url(${sideNews[0].image})` }"
                role="button"
                tabindex="0"
                @click="setCurrent(sideNews[0].id)"
                @keydown.enter="setCurrent(sideNews[0].id)"
              >
                <div class="absolute inset-0 bg-linear-to-b from-primary-darkest/18 to-primary-darkest/82"></div>
                <div class="relative z-40 flex h-full flex-col justify-end p-4">
                  <p class="text-xs uppercase tracking-[0.15em] text-neutral-light/70">{{ sideNews[0].category }}</p>
                  <p class="mt-2 text-sm text-neutral-light/90">{{ sideNews[0].title }}</p>
                </div>
              </article>

              <article
                v-if="highlightedNews"
                class="relative overflow-hidden bg-cover bg-center rounded transition-all duration-220 hover:scale-100 hover:-translate-y-1 min-h-96 scale-105 shadow-2xl z-30"
                :style="{ backgroundImage: `url(${highlightedNews.image})` }"
              >
                <div class="absolute inset-0 bg-linear-to-b from-primary-darkest/18 to-primary-darkest/82"></div>
                <div class="relative z-40 flex h-full flex-col justify-end p-4">
                  <p class="text-xs uppercase tracking-[0.18em] text-neutral-light/75">{{ highlightedNews.category }}</p>
                  <p class="text-lg text-neutral-light sm:text-2xl">{{ highlightedNews.title }}</p>
                  <p class="mt-2 max-w-xl text-sm leading-6 text-neutral-light/85">{{ highlightedNews.summary }}</p>
                  <RouterLink :to="{ name: 'nyhed', params: { id: highlightedNews.id } }" class="inline-block mt-2 px-4 py-2 text-sm text-white border border-white/70 rounded hover:bg-white/20 transition-colors duration-200">Læs mere</RouterLink>
                </div>
              </article>

              <article
                v-if="sideNews[1]"
                class="relative overflow-hidden bg-cover bg-center rounded transition-all duration-220 hover:scale-105 hover:-translate-y-1 min-h-56 z-10 cursor-pointer"
                :style="{ backgroundImage: `url(${sideNews[1].image})` }"
                role="button"
                tabindex="0"
                @click="setCurrent(sideNews[1].id)"
                @keydown.enter="setCurrent(sideNews[1].id)"
              >
                <div class="absolute inset-0 bg-linear-to-b from-primary-darkest/18 to-primary-darkest/82"></div>
                <div class="relative z-40 flex h-full flex-col justify-end p-4">
                  <p class="text-xs uppercase tracking-[0.15em] text-neutral-light/70">{{ sideNews[1].category }}</p>
                  <p class="mt-2 text-sm text-neutral-light/90">{{ sideNews[1].title }}</p>
                </div>
              </article>
            </div>
          </div>

          <!-- Navigationspile -->
          <button
            class="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary-darkest/20 bg-neutral-light text-primary-darkest text-lg hover:bg-primary-light hover:-translate-y-[52%] transition-all duration-160 flex items-center justify-center z-50"
            style="right: 40px"
            type="button"
            aria-label="Næste nyhed"
            @click="nextNews"
          >
            &#10095;
          </button>
          <button
            class="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary-darkest/20 bg-neutral-light text-primary-darkest text-lg hover:bg-primary-light hover:-translate-y-[52%] transition-all duration-160 flex items-center justify-center z-50"
            style="left: 40px"
            type="button"
            aria-label="Forrige nyhed"
            @click="previousNews"
          >
            &#10094;
          </button>
        </div>
        </div>
      </div>
    </section>

    <!-- Nyheds-liste: Søgbar oversigt over alle nyheder -->
    <section class="w-full px-8 pb-16" style="background: linear-gradient(180deg, #e8edf3 0%, #f6f8fb 60%, #f5f7fa 100%);">
      <div class="grid grid-cols-12 gap-4 mb-6 pt-10">
        <div class="col-start-2 col-end-11">
          <h2 class="text-2xl font-light text-primary-darkest sm:text-3xl">Alle opdateringer</h2>
          <p class="mt-2 text-sm text-primary-darkest/70">
            Et samlet overblik over projektets opdateringer, indsigter, events og resultater.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-4 mb-8">
        <div class="col-start-2 col-end-11">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Søg efter nyhed..."
            class="w-full border border-primary-light/30 rounded px-4 py-2 text-primary-darkest placeholder:text-primary-darkest/50 focus:border-primary-base focus:outline-none"
          />
        </div>
      </div>

      <section>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-start-2 col-end-11">
            <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="item in filteredNews"
                :key="item.id"
                class="news-card list-card full-card"
                :style="{ backgroundImage: `url(${item.image})` }"
              >
                <div class="card-overlay">
                  <p class="text-xs uppercase tracking-[0.15em] text-neutral-light/80">{{ item.category }}</p>
                  <h4 class="mt-2 text-xl text-neutral-light">{{ item.title }}</h4>
                  <p class="mt-2 line-clamp-2 text-sm text-neutral-light/90">{{ item.summary }}</p>
                  <RouterLink
                    :to="{ name: 'nyhed', params: { id: item.id } }"
                    class="mt-4 inline-flex w-fit items-center rounded border border-white/70 px-3 py-1.5 text-xs uppercase tracking-[0.08em] text-neutral-light transition-colors hover:bg-white/20"
                  >
                    Læs mere
                  </RouterLink>
                </div>
              </article>

              <div v-if="filteredNews.length === 0" class="col-span-full py-8 text-center text-primary-darkest/60">
                <p>Ingen nyheder fundet som matcher din søgning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.news-page {
  background: transparent;
}

/* Gradient background på nyheds-listen */
.list-gradient {
  background: linear-gradient(180deg, #e8edf3 0%, #f6f8fb 60%, #f5f7fa 100%);
}

/* Kort-styling for både karussel og liste */
.news-card {
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  border-radius: 0.375rem;
  transition: transform 220ms ease, box-shadow 220ms ease;
  cursor: default;
}

.news-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(13, 27, 42, 0.18) 0%, rgba(13, 27, 42, 0.82) 100%);
}

/* Tekst-overlay på kortene */
.card-overlay {
  position: relative;
  z-index: 4;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
}

/* Responsiv styling */
@media (max-width: 767px) {
  .hero-section h1 {
    font-size: 2rem;
  }
}
</style>
