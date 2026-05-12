
<!-- Her vises det fra forsiden -->

<script setup>
import { ref, computed } from 'vue'
import { categories } from '../data/categories'
import { allNews } from '../data/news'

// Aktiv tab tracker
const activeTab = ref(null)

// Nyheds karrusel
const currentIndex = ref(0)

const highlightedNews = computed(() => allNews[currentIndex.value])

const sideNews = computed(() => {
  if (allNews.length < 2) return []

  const prevIndex = (currentIndex.value - 1 + allNews.length) % allNews.length
  const nextIndex = (currentIndex.value + 1) % allNews.length

  return [allNews[prevIndex], allNews[nextIndex]]
})

const previousNews = () => {
  const left = sideNews.value[0]
  if (left) {
    setCurrent(left.id)
  } else {
    currentIndex.value = (currentIndex.value - 1 + allNews.length) % allNews.length
  }
}

const nextNews = () => {
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
  <header
    class="relative min-h-96 w-screen bg-cover bg-center overflow-x-hidden"
    style="background-image: url('/src/assets/hero.gif')"
  >
    <!-- Blå overlay -->
    <div class="absolute w-full h-full bg-primary-base"></div>
    <!-- Content -->
    <div class="relative z-10 grid grid-cols-12 gap-4 px-8 pt-30 pb-16 w-full">
      <div class="col-start-2 col-end-10 flex flex-col">
      <p class="text-sm font-semibold uppercase text-white/80">Velkommen til</p>
      <h1 class="mt-2 text-4xl font-bold text-white sm:text-5xl">Business DE-DK</h1>
      <p class="mt-4 max-w-2xl text-lg text-white/90">
        Vi skaber stærke forbindelser mellem virksomheder i grænseregionen for at fremme vækst, samarbejde og nye muligheder.
      </p>
      <div class="mt-8 flex flex-wrap gap-4">
        <RouterLink
          to="/nyheder"
          class=" border border-white bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          Nyheder & Indsigter
        </RouterLink>
        <button
          class=" border border-white bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          type="button"
        >
          Jobportal
        </button>
      </div>
      </div>
    </div>
  </header>

  <!-- Ny sektion: Kategorier med billede -->
  <section class="w-full bg-white">
    <div class="grid grid-cols-12 gap-4 px-8 py-12">
      <!-- Venstre side: Kategorier (Accordion stil) -->
      <div class="col-start-2 col-end-7">
        <div class="space-y-0">
          <!-- Alle kategorier som accordions -->
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="space-y-0 border-b border-neutral-light/20"
          >
            <button
              @click="activeTab = activeTab === index ? null : index"
              :class="[
                'w-full text-left px-6 py-4 transition-all duration-300',
                activeTab === index
                  ? 'text-2xl font-bold text-primary-darkest border-l-4 border-primary-base'
                  : 'text-xl font-light text-primary-darkest/60 hover:text-primary-darkest border-l-4 border-transparent hover:border-primary-base'
              ]"
            >
              {{ category.title }}
            </button>

            <!-- Tekst indhold vises kun under den aktive kategori -->
            <div
              v-if="activeTab === index"
              class="px-12 py-4 bg-neutral-light/10 space-y-4"
            >
              <p class="text-base font-light text-primary-darkest leading-relaxed">
                {{ category.content }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Højre side: Billede -->
      <div class="col-start-7 col-end-11 flex items-start justify-center sticky top-12">
        <img
          src="https://picsum.photos/600/800"
          alt="Grænse billede"
          class="w-full h-auto object-cover shadow-lg"
        />
      </div>
    </div>
  </section>

  <!-- Nyheds Karrusel -->
  <section class="mx-auto max-w-6xl px-4 md:px-8 p-8 mb-8">
    <h2 class="mb-18 text-2xl font-light text-primary-darkest sm:text-3xl uppercase">Seneste nyheder</h2>
    <div class="flex items-center gap-3">
      <button
        class="w-10 h-10 rounded-full border border-primary-darkest/20 bg-neutral-light text-primary-darkest text-lg hover:bg-primary-light hover:-translate-y-0.5 transition-all duration-160 flex items-center justify-center"
        type="button"
        aria-label="Forrige nyhed"
        @click="previousNews"
      >
        &#10094;
      </button>

      <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-[1fr_2fr_1fr]">
        <article
          v-if="sideNews[0]"
          class="relative overflow-hidden bg-cover bg-center rounded transition-all duration-220 hover:scale-105 hover:-translate-y-1 min-h-[200px] z-10 cursor-pointer"
          :style="{ backgroundImage: `url(${sideNews[0].image})` }"
          role="button"
          tabindex="0"
          @click="setCurrent(sideNews[0].id)"
          @keydown.enter="setCurrent(sideNews[0].id)"
        >
          <div class="absolute inset-0 bg-gradient-to-b from-primary-darkest/18 to-primary-darkest/82"></div>
          <div class="relative z-40 flex h-full flex-col justify-end p-4">
            <p class="text-sm text-neutral-light/90">{{ sideNews[0].title }}</p>
          </div>
        </article>

        <article
          v-if="highlightedNews"
          class="relative overflow-hidden bg-cover bg-center rounded transition-all duration-220 hover:scale-105 hover:-translate-y-1 min-h-[320px] scale-105 shadow-2xl z-30"
          :style="{ backgroundImage: `url(${highlightedNews.image})` }"
        >
          <div class="absolute inset-0 bg-gradient-to-b from-primary-darkest/18 to-primary-darkest/82"></div>
          <div class="relative z-40 flex h-full flex-col justify-end p-4">
            <p class="text-lg text-neutral-light sm:text-2xl">{{ highlightedNews.title }}</p>
            <RouterLink :to="{ name: 'nyhed', params: { id: highlightedNews.id } }" class="inline-block mt-2 px-4 py-2 text-sm text-white border border-white/70 rounded hover:bg-white/20 transition-colors duration-200">Læs mere</RouterLink>
          </div>
        </article>

        <article
          v-if="sideNews[1]"
          class="relative overflow-hidden bg-cover bg-center rounded transition-all duration-220 hover:scale-105 hover:-translate-y-1 min-h-[200px] z-10 cursor-pointer"
          :style="{ backgroundImage: `url(${sideNews[1].image})` }"
          role="button"
          tabindex="0"
          @click="setCurrent(sideNews[1].id)"
          @keydown.enter="setCurrent(sideNews[1].id)"
        >
          <div class="absolute inset-0 bg-gradient-to-b from-primary-darkest/18 to-primary-darkest/82"></div>
          <div class="relative z-40 flex h-full flex-col justify-end p-4">
            <p class="text-sm text-neutral-light/90">{{ sideNews[1].title }}</p>
          </div>
        </article>
      </div>

      <button
        class="w-10 h-10 rounded-full border border-primary-darkest/20 bg-neutral-light text-primary-darkest text-lg hover:bg-primary-light hover:-translate-y-0.5 transition-all duration-160 flex items-center justify-center"
        type="button"
        aria-label="Naeste nyhed"
        @click="nextNews"
      >
        &#10095;
      </button>
    </div>
  </section>
</template>

