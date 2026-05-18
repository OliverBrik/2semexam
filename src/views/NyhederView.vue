<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { allNews } from '../data/news.js'

const { t, locale } = useI18n()

// Helper to get translated news data
const getTranslatedNews = (newsId) => {
  const newsItems = t('newsItems')
  const newsIndex = allNews.findIndex(n => n.id === newsId)
  if (Array.isArray(newsItems) && newsIndex >= 0 && newsIndex < newsItems.length) {
    return newsItems[newsIndex]
  }
  return null
}

// Cached translation map that updates when locale changes
const translatedNewsMap = computed(() => {
  locale.value // Force dependency tracking
  const map = {}
  const newsItems = t('newsItems')
  if (Array.isArray(newsItems)) {
    allNews.forEach((news, idx) => {
      if (idx < newsItems.length) {
        map[news.id] = newsItems[idx]
      }
    })
  }
  return map
})

// Søgeboks til nyheds-listen
const searchQuery = ref('')
const selectedCategory = ref('Alle kategorier')

// Get translated category name or fallback
const getTranslatedCategory = (category) => {
  const categories = t('newsCategories')
  return categories?.[category] || category
}

const availableCategories = computed(() => {
  return ['Alle kategorier', ...new Set(allNews.map((news) => news.category))]
})

// Filtrerede og sorterede nyheder til listen
const filteredNews = computed(() => {
  locale.value // Force reactivity on locale change
  
  let filtered = allNews.filter((news) =>
    (selectedCategory.value === 'Alle kategorier' || news.category === selectedCategory.value)
  )
  
  // Filter by search query on translated title/summary
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((news) => {
      const translated = getTranslatedNews(news.id)
      const title = translated?.title || news.title || ''
      const summary = translated?.summary || news.summary || ''
      const category = getTranslatedCategory(news.category)
      
      return (
        title.toLowerCase().includes(query) ||
        summary.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query)
      )
    })
  }

  return filtered
})

const resultsCount = computed(() => filteredNews.value.length)
</script>

<template>
  <div class="news-page p-0! overflow-x-hidden">
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
            <p class="text-sm font-semibold uppercase text-neutral-light/70">{{ $t('news.subtitle') }}</p>
            <h1 class="mt-2 text-4xl font-bold text-white sm:text-5xl">
              {{ $t('news.title') }}
            </h1>
            <p class="mt-4 max-w-2xl text-lg text-white/90">
              {{ $t('news.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Nyheds-liste: Søgbar oversigt over alle nyheder -->
    <section class="w-full px-8 pb-16" style="background: linear-gradient(180deg, #e8edf3 0%, #f6f8fb 60%, #f5f7fa 100%);">
      <div class="grid grid-cols-12 gap-4 mb-6 pt-10">
        <div class="col-start-2 col-end-11">
          <h2 class="text-2xl font-light text-primary-darkest sm:text-3xl">{{ $t('news.latestNews') }}</h2>
          <p class="mt-2 text-sm text-primary-darkest/70">
            {{ $t('news.overview') }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-4 mb-8">
        <div class="col-start-2 col-end-12">
          <div class="flex flex-col gap-4">
            <label class="text-sm font-light text-primary-darkest" for="news-search">{{ $t('news.search') }}</label>
            <div class="flex w-full flex-col gap-3 md:flex-row">
              <input
                id="news-search"
                v-model="searchQuery"
                type="text"
                :placeholder="$t('news.searchPlaceholder')"
                class="w-full border border-primary-darkest/20 bg-white px-5 py-3 text-primary-darkest shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
              <select
                v-model="selectedCategory"
                class="w-full border border-primary-darkest/20 bg-white px-5 py-3 text-primary-darkest shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light md:max-w-xs"
              >
                <option v-for="category in availableCategories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
            <p class="uppercase text-sm font-light text-primary-darkest/70">{{ resultsCount }} {{ $t('news.results') }}</p>
          </div>
        </div>
      </div>

      <section>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-start-2 col-end-12">
            <div class="grid gap-6 lg:grid-cols-2">
              <article
                v-for="(item, index) in filteredNews"
                :key="item.id"
                class="news-card list-card full-card min-h-80"
                :style="{ backgroundImage: `url(${item.image})` }"
              >
                <div class="absolute right-3 top-3 z-10">
                  <p class="bg-primary-darkest/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-light backdrop-blur-sm">
                    {{ item.badge }}
                  </p>
                </div>

                <div class="card-overlay">
                  <p class="text-xs uppercase tracking-[0.15em] text-neutral-light/80">{{ getTranslatedCategory(item.category) }}</p>
                  <h4 class="mt-2 text-xl text-neutral-light">{{ translatedNewsMap[item.id]?.title || item.title }}</h4>
                  <p class="mt-2 line-clamp-2 text-sm text-neutral-light/90">{{ translatedNewsMap[item.id]?.summary || item.summary }}</p>
                  <RouterLink
                    :to="{ name: 'nyhed', params: { id: item.id } }"
                    class="mt-4 inline-flex w-fit items-center border border-white/70 px-3 py-1.5 text-xs uppercase tracking-[0.08em] text-neutral-light transition-colors hover:bg-white/20"
                  >
                    {{ $t('home.readMore') }}
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
  </div>
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
