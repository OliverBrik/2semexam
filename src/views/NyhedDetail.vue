<template>
  <main class="nyhed-detail mx-auto max-w-5xl px-4 py-12">
    <RouterLink to="/nyheder" class="back-link text-sm text-primary-darkest">← Tilbage til Nyheder</RouterLink>

    <div v-if="article" class="mt-6 rounded-md bg-white shadow-sm p-6">
      <header class="mb-4">
        <h1 class="text-3xl font-light text-primary-darkest">{{ article.title }}</h1>
        <div class="mt-2 flex flex-wrap items-center gap-4 text-sm text-neutral-dark">
          <span class="font-medium text-neutral-dark/80">{{ article.category }}</span>
          <span class="text-neutral-dark/60">•</span>
          <span class="text-neutral-dark/60">12. maj 2026</span>
          <span class="text-neutral-dark/60">•</span>
          <span class="text-neutral-dark/60">Af Business Region</span>
        </div>
      </header>

      <div class="media rounded-md overflow-hidden" :style="{ backgroundImage: `url(${article.image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '360px' }"></div>

      <article class="prose mt-6 text-neutral-dark">
        <p>{{ article.body }}</p>
        <p class="mt-4 text-sm text-neutral-dark/80">(Dette er en statisk eksempelartikel — senere kan indhold hentes fra API.)</p>
      </article>

      <footer class="mt-8 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button class="btn-primary">Kontakt os</button>
          <a class="text-sm text-neutral-dark/70">Gem</a>
        </div>

        <div class="share flex items-center gap-3 text-neutral-dark/70">
          <a aria-label="Del pa Facebook">Facebook</a>
          <a aria-label="Del pa LinkedIn">LinkedIn</a>
        </div>
      </footer>
    </div>

    <p v-else class="text-sm text-primary-darkest mt-6">Nyheden blev ikke fundet.</p>
  </main>
</template>

<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { allNews } from '../data/news.js'

const route = useRoute()
const id = Number(route.params.id)
const article = allNews.find((a) => a.id === id)
</script>

<style scoped>
.back-link { color: #0d1b2a; }
.nyhed-detail { color: #0d1b2a; }
.btn-primary { background:#0d1b2a; color:white; padding:0.45rem 0.75rem; border-radius:0.25rem; }
.media { margin-top: 0.5rem; }
.prose p { margin-bottom: 1rem; }
</style>
