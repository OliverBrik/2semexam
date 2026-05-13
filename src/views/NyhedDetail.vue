<template>
  <main class="mx-auto max-w-5xl px-4 py-12 text-primary-darkest">
    <RouterLink
      to="/nyheder"
      class="inline-flex items-center text-sm font-medium text-primary-darkest transition-colors hover:text-primary-base"
    >
      ← Tilbage til Nyheder
    </RouterLink>

    <article v-if="article" class="mt-6 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/5">
      <header class="border-b border-slate-100 px-6 py-6 md:px-8">
        <p class="text-sm font-medium uppercase tracking-[0.14em] text-primary-base">{{ article.category }}</p>
        <h1 class="mt-2 text-3xl font-light text-primary-darkest sm:text-4xl">
          {{ article.title }}
        </h1>
        <div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>12. maj 2026</span>
          <span class="h-1 w-1 rounded-full bg-slate-300"></span>
          <span>Af Business Region</span>
        </div>
      </header>

      <div class="h-[320px] w-full bg-cover bg-center md:h-[420px]" :style="{ backgroundImage: `url(${article.image})` }"></div>

      <div class="px-6 py-6 md:px-8">
        <div class="space-y-4 text-base leading-7 text-slate-700">
          <p>{{ article.body }}</p>
          <p class="text-sm text-slate-500">
            (Dette er en statisk eksempelartikel — senere kan indhold hentes fra API.)
          </p>
        </div>

        <footer class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
          <div class="flex items-center gap-3">
            <button class="rounded-md bg-primary-darkest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-base">
              Kontakt os
            </button>
            <button class="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50">
              Gem
            </button>
          </div>

          <div class="flex items-center gap-3 text-sm text-slate-500">
            <a class="transition-colors hover:text-primary-darkest" aria-label="Del på Facebook">Facebook</a>
            <a class="transition-colors hover:text-primary-darkest" aria-label="Del på LinkedIn">LinkedIn</a>
          </div>
        </footer>
      </div>
    </article>

    <p v-else class="mt-6 text-sm text-primary-darkest">Nyheden blev ikke fundet.</p>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { allNews } from '../data/news.js'

// Henter rute-parameteren (nyhedens id fra URLen)
const route = useRoute()
const id = Number(route.params.id)
// Finder den nyhed som brugeren har klikket på
const article = allNews.find((a) => a.id === id)
</script>
