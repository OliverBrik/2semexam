<script setup>
import { computed, ref } from 'vue'
import { allNews } from '../data/news.js'

// Holder track af hvilken nyhed der vises i karusellens center
const currentIndex = ref(0)

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
  <main class="news-page">
    <!-- Kort intro til siden -->
    <section class="hero-section">
      <div class="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-6 py-10 md:px-10 md:py-12">
        <div class="col-span-12 lg:col-span-7">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-light/70">Nyheder & indsigter</p>
          <h1 class="mt-4 max-w-3xl text-3xl font-light leading-tight text-neutral-light sm:text-4xl">
            Projektets fremdrift, erfaringer og resultater samlet ét sted
          </h1>
          <p class="mt-4 max-w-2xl text-sm leading-7 text-neutral-light/80 sm:text-base">
            Her deler vi opdateringer fra projektet, indsigter fra arbejdet i grænseregionen og de vigtigste
            resultater, så man hurtigt kan se, hvad der sker og hvorfor det betyder noget.
          </p>

          <div class="mt-6 grid gap-3 sm:grid-cols-3">
            <article class="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p class="text-xs uppercase tracking-[0.18em] text-neutral-light/70">Opdatering</p>
              <p class="mt-2 text-sm leading-6 text-neutral-light/90">Nye aktiviteter og status fra projektet.</p>
            </article>
            <article class="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p class="text-xs uppercase tracking-[0.18em] text-neutral-light/70">Indsigt</p>
              <p class="mt-2 text-sm leading-6 text-neutral-light/90">Viden om regionen og målgruppen bag projektet.</p>
            </article>
            <article class="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p class="text-xs uppercase tracking-[0.18em] text-neutral-light/70">Resultat</p>
              <p class="mt-2 text-sm leading-6 text-neutral-light/90">Det projektet faktisk har skabt i praksis.</p>
            </article>
          </div>
        </div>

        <aside class="col-span-12 lg:col-span-5">
          <div class="h-full rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm lg:min-h-55">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-light/70">Fokus lige nu</p>
            <h2 class="mt-3 text-2xl font-light text-neutral-light">Hvad siden viser</h2>
            <div class="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div class="rounded-xl bg-white/10 p-4">
                <p class="text-sm font-medium text-neutral-light">Projektstatus</p>
                <p class="mt-1 text-sm leading-6 text-neutral-light/80">Kort overblik over det seneste arbejde.</p>
              </div>
              <div class="rounded-xl bg-white/10 p-4">
                <p class="text-sm font-medium text-neutral-light">Viden og indblik</p>
                <p class="mt-1 text-sm leading-6 text-neutral-light/80">Det vigtigste man bør vide om projektet.</p>
              </div>
              <div class="rounded-xl bg-white/10 p-4">
                <p class="text-sm font-medium text-neutral-light">Resultater</p>
                <p class="mt-1 text-sm leading-6 text-neutral-light/80">Hvad der er kommet ud af indsatsen.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- Karusellen med den vigtigste nyhed i midten -->
    <section class="carousel-wrap mx-auto mt-6 max-w-6xl px-4 md:px-8">
      <div class="mb-4 flex flex-wrap items-end justify-between gap-3 px-2">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary-darkest/55">Seneste fokus</p>
          <h2 class="mt-1 text-2xl font-light text-primary-darkest sm:text-3xl">De vigtigste projektopdateringer</h2>
        </div>
        <p class="max-w-2xl text-sm leading-6 text-primary-darkest/70">
          Karusellen fremhæver det indhold, der bedst viser projektets retning lige nu.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          class="carousel-control"
          type="button"
          aria-label="Forrige nyhed"
          @click="previousNews"
        >
          &#10094;
        </button>

        <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-[1fr_2fr_1fr]">

          <article
            v-if="sideNews[0]"
            class="news-card side-card cursor-pointer"
            :style="{ backgroundImage: `url(${sideNews[0].image})` }"
            role="button"
            tabindex="0"
            @click="setCurrent(sideNews[0].id)"
            @keydown.enter="setCurrent(sideNews[0].id)"
          >
            <div class="card-overlay">
              <p class="text-xs uppercase tracking-[0.15em] text-neutral-light/70">{{ sideNews[0].category }}</p>
              <p class="mt-2 text-sm text-neutral-light/90">{{ sideNews[0].title }}</p>
            </div>
          </article>


          <article
            v-if="highlightedNews"
            class="news-card featured-card"
            :style="{ backgroundImage: `url(${highlightedNews.image})` }"
          >
            <div class="card-overlay">
              <p class="text-xs uppercase tracking-[0.18em] text-neutral-light/75">{{ highlightedNews.category }}</p>
              <p class="text-lg text-neutral-light sm:text-2xl">{{ highlightedNews.title }}</p>
              <p class="mt-2 max-w-xl text-sm leading-6 text-neutral-light/85">{{ highlightedNews.summary }}</p>
              <RouterLink :to="{ name: 'nyhed', params: { id: highlightedNews.id } }" class="read-more-btn">Læs mere</RouterLink>
            </div>
          </article>


          <article
            v-if="sideNews[1]"
            class="news-card side-card cursor-pointer"
            :style="{ backgroundImage: `url(${sideNews[1].image})` }"
            role="button"
            tabindex="0"
            @click="setCurrent(sideNews[1].id)"
            @keydown.enter="setCurrent(sideNews[1].id)"
          >
            <div class="card-overlay">
              <p class="text-xs uppercase tracking-[0.15em] text-neutral-light/70">{{ sideNews[1].category }}</p>
              <p class="mt-2 text-sm text-neutral-light/90">{{ sideNews[1].title }}</p>
            </div>
          </article>
        </div>

        <button
          class="carousel-control"
          type="button"
          aria-label="Næste nyhed"
          @click="nextNews"
        >
          &#10095;
        </button>
      </div>
    </section>

    <!-- Hele nyhedsoversigten -->
    <section class="mx-auto mt-10 max-w-6xl px-4 pb-16 md:px-8">
      <div class="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 class="text-2xl font-light text-primary-darkest sm:text-3xl">Alle opdateringer</h2>
          <p class="mt-2 max-w-2xl text-sm text-primary-darkest/70">
            Et samlet overblik over projektets opdateringer, indsigter, events og resultater.
          </p>
        </div>
      </div>

      <section>
        <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="item in allNews"
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
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.news-page {
  background: linear-gradient(180deg, #e8edf3 0%, #f6f8fb 60%, #f5f7fa 100%);
}

.hero-section {
  background: linear-gradient(125deg, #1e3752 0%, #415a77 60%, #2c3f59 100%);
}

.carousel-wrap {
  margin-top: 1.5rem;
  padding: 1.25rem 0.5rem;
  background: linear-gradient(180deg, rgba(13,27,42,0.06), rgba(13,27,42,0.02));
  border-radius: 0.5rem;
}

.carousel-control {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(13, 27, 42, 0.2);
  background: #f3f7fb;
  color: #0d1b2a;
  font-size: 1.125rem;
  transition: transform 160ms ease, background-color 160ms ease;
}

.carousel-control:hover {
  transform: translateY(-1px);
  background: #e1e8f0;
}

.news-card {
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  border-radius: 0.375rem;
  transition: transform 220ms ease, box-shadow 220ms ease;
  cursor: default;
}

.news-card.cursor-pointer { cursor: pointer; }

.news-card:hover { transform: translateY(-4px) scale(1.01); }

.news-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(13, 27, 42, 0.18) 0%, rgba(13, 27, 42, 0.82) 100%);
}

.side-card {
  min-height: 240px;
}

.featured-card {
  min-height: 420px;
  transform: scale(1.015);
  box-shadow: 0 8px 30px rgba(13, 27, 42, 0.25);
}

.side-card { z-index: 1; }
.featured-card { z-index: 3; position: relative; }

.list-card {
  min-height: 300px;
}

.card-overlay {
  position: relative;
  z-index: 4;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
}

@media (max-width: 767px) {
  .carousel-wrap {
    margin-top: 1rem;
  }

  .hero-section .grid {
    row-gap: 1.5rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .featured-card,
  .list-card {
    min-height: 220px;
  }
}
</style>
