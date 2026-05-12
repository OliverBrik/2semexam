<script setup>
import { computed, ref } from 'vue'
import { allNews } from '../data/news.js'

const searchTerm = ref('')
const selectedCategories = ref([])
const currentIndex = ref(0)

const categories = computed(() => [...new Set(allNews.map((item) => item.category))])

const filteredNews = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()

  return allNews.filter((item) => {
    const matchesText =
      term.length === 0 ||
      item.title.toLowerCase().includes(term) ||
      item.summary.toLowerCase().includes(term)

    const matchesCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(item.category)

    return matchesText && matchesCategory
  })
})

const highlightedNews = computed(() => allNews[currentIndex.value])

const sideNews = computed(() => {
  if (allNews.length < 2) return []

  const prevIndex = (currentIndex.value - 1 + allNews.length) % allNews.length
  const nextIndex = (currentIndex.value + 1) % allNews.length

  return [allNews[prevIndex], allNews[nextIndex]]
})

const previousNews = () => {
  // Prefer the left side card if available, otherwise step circularly
  const left = sideNews.value[0]
  if (left) {
    setCurrent(left.id)
  } else {
    currentIndex.value = (currentIndex.value - 1 + allNews.length) % allNews.length
  }
}

const nextNews = () => {
  // Prefer the right side card if available, otherwise step circularly
  const right = sideNews.value[1]
  if (right) {
    setCurrent(right.id)
  } else {
    currentIndex.value = (currentIndex.value + 1) % allNews.length
  }
}

const setCurrent = (id) => {
  const idx = allNews.findIndex((n) => n.id === id)
  if (idx !== -1) currentIndex.value = idx
}
</script>

<template>
  <main class="news-page">
    <section class="hero-section">
      <div class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <h1 class="text-4xl font-light text-neutral-light sm:text-5xl">Nyheder</h1>
        <p class="mt-5 max-w-2xl text-sm text-neutral-light/80 sm:text-base">
          Vi skaber staerke forbindelser mellem virksomheder i graenseregionen for at fremme vaekst,
          samarbejde og nye muligheder.
        </p>
      </div>
    </section>

    <section class="carousel-wrap mx-auto mt-6 max-w-6xl px-4 md:px-8">
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
          <!-- Left side card -->
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
              <p class="text-sm text-neutral-light/90">{{ sideNews[0].title }}</p>
            </div>
          </article>

          <!-- Featured center card -->
          <article
            v-if="highlightedNews"
            class="news-card featured-card"
            :style="{ backgroundImage: `url(${highlightedNews.image})` }"
          >
            <div class="card-overlay">
              <p class="text-lg text-neutral-light sm:text-2xl">{{ highlightedNews.title }}</p>
              <RouterLink :to="{ name: 'nyhed', params: { id: highlightedNews.id } }" class="read-more-btn">Læs mere</RouterLink>
            </div>
          </article>

          <!-- Right side card -->
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
              <p class="text-sm text-neutral-light/90">{{ sideNews[1].title }}</p>
            </div>
          </article>
        </div>

        <button
          class="carousel-control"
          type="button"
          aria-label="Naeste nyhed"
          @click="nextNews"
        >
          &#10095;
        </button>
      </div>
    </section>

    <section class="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 px-4 pb-16 md:grid-cols-[280px_1fr] md:px-8">
      <aside class="filter-panel">
        <h2 class="text-xl text-neutral-light">Filter</h2>

        <label for="search-news" class="mt-4 block text-sm text-neutral-light/80">Søg</label>
        <div class="relative mt-2">
          <input
            id="search-news"
            v-model="searchTerm"
            type="text"
            placeholder="Søg i nyheder"
            class="w-full rounded-sm border border-neutral-light/20 bg-primary-base px-3 py-2 text-sm text-neutral-light outline-none placeholder:text-neutral-light/50 focus:border-neutral-light/50"
          />
        </div>

        <h3 class="mt-6 text-sm uppercase tracking-[0.14em] text-neutral-light/80">Kategorier</h3>
        <div class="mt-3 space-y-2">
          <label
            v-for="category in categories"
            :key="category"
            class="flex cursor-pointer items-center gap-2 text-sm text-neutral-light"
          >
            <input
              v-model="selectedCategories"
              type="checkbox"
              :value="category"
              class="h-4 w-4 accent-neutral-light"
            />
            {{ category }}
          </label>
        </div>
      </aside>

      <section>
        <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
          <article
            v-for="item in filteredNews"
            :key="item.id"
            class="news-card list-card"
            :style="{ backgroundImage: `url(${item.image})` }"
          >
            <div class="card-overlay">
              <p class="text-xs uppercase tracking-[0.15em] text-neutral-light/80">{{ item.category }}</p>
              <h4 class="mt-2 text-xl text-neutral-light">{{ item.title }}</h4>
              <p class="mt-2 line-clamp-2 text-sm text-neutral-light/90">{{ item.summary }}</p>
              <RouterLink :to="{ name: 'nyhed', params: { id: item.id } }" class="read-more-btn mt-4">Læs mere</RouterLink>
            </div>
          </article>
        </div>

        <p v-if="filteredNews.length === 0" class="mt-6 text-sm text-primary-darkest">
          Ingen nyheder matcher dine filtre lige nu.
        </p>
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
  margin-top: -4rem;
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
  min-height: 200px;
}

.featured-card {
  min-height: 320px;
  transform: scale(1.01);
  box-shadow: 0 8px 30px rgba(13, 27, 42, 0.25);
}

/* Ensure featured card overlays above side cards so its controls are visible */
.side-card { z-index: 1; }
.featured-card { z-index: 3; position: relative; }

.list-card {
  min-height: 270px;
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

.read-more-btn {
  width: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: transparent;
  padding: 0.35rem 0.65rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #f8fbff;
  transition: background-color 160ms ease;
}

.read-more-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.filter-panel {
  height: fit-content;
  border-radius: 0.25rem;
  background: linear-gradient(160deg, #526784 0%, #465b78 100%);
  padding: 1.15rem;
}

@media (max-width: 767px) {
  .carousel-wrap {
    margin-top: 0;
  }

  .featured-card,
  .list-card {
    min-height: 220px;
  }

  .side-card {
    display: none;
  }
}
</style>
