<template>
  <main class="grid w-full grid-cols-12 gap-4 px-8 py-12 text-primary-darkest">
    <RouterLink
      to="/nyheder"
      class="col-span-12 inline-flex items-center text-sm font-medium text-primary-darkest transition-colors hover:text-primary-base lg:col-start-2 lg:col-end-12"
    >
      ← Tilbage til Nyheder
    </RouterLink>

    <article v-if="article" class="col-span-12 mt-6 overflow-hidden bg-white shadow-sm ring-1 ring-black/5 lg:col-start-2 lg:col-end-12">
      <header class="border-b border-slate-100 px-6 py-6 md:px-8">
        <p class="text-sm font-medium uppercase tracking-[0.14em] text-primary-base">{{ article.category }}</p>
        <h1 class="mt-2 text-3xl font-light text-primary-darkest sm:text-4xl">
          {{ article.title }}
        </h1>
        <div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>12. maj 2026</span>
          <span class="h-1 w-1 bg-slate-300"></span>
          <span>Af Business Region</span>
        </div>
      </header>

      <div v-if="article.youtube" class="mx-auto my-6 max-w-2xl">
        <div class="relative w-full bg-black pb-[56.25%]">
          <iframe
            class="absolute inset-0 h-full w-full"
            :src="`https://www.youtube.com/embed/${article.youtube}?rel=0`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      

      <div class="px-6 py-6 md:px-8">
        <div class="space-y-4 text-base leading-7 text-slate-700" v-html="article.body"></div>

        <div v-if="article.youtube2" class="mx-auto my-6 max-w-2xl">
          <div class="relative w-full bg-black pb-[56.25%]">
            <iframe
              class="absolute inset-0 h-full w-full"
              :src="`https://www.youtube.com/embed/${article.youtube2}?rel=0`"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <div v-if="article.contactName || article.contactEmail" class="mt-6 border-t border-slate-100 pt-6 text-sm text-slate-700">
          <p class="font-medium text-slate-900">{{ article.contactTitle }}</p>
          <p class="mt-1">{{ article.contactName }}</p>
          <p class="mt-1">Email: <a :href="`mailto:${article.contactEmail}`" class="text-primary-base">{{ article.contactEmail }}</a></p>
          <p class="mt-1">Telefon: <a :href="`tel:${article.contactPhone}`">{{ article.contactPhone }}</a></p>
        </div>

        <footer class="mt-8 grid grid-cols-12 gap-4 border-t border-slate-100 pt-6 lg:col-start-2 lg:col-end-12">
          <div class="col-span-12 flex items-center gap-3">
            <RouterLink to="/kontakt" class=" bg-primary-darkest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-base inline-block">
              Kontakt os
            </RouterLink>
            <div class="relative inline-block" ref="shareMenuRef">
              <button @click="shareOpen = !shareOpen" class="border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50">
                Del
              </button>
              <div v-if="shareOpen" class="absolute left-0 bottom-full mb-2 w-48 bg-white border border-slate-200 shadow-lg z-10 rounded">
                <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`" target="_blank" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  Del på Facebook
                </a>
                <a :href="`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`" target="_blank" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  Del på LinkedIn
                </a>
                <a :href="`https://www.instagram.com/`" target="_blank" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  Del på Instagram
                </a>
              </div>
            </div>
          </div>

          <div class="col-span-12 flex items-center gap-3 text-sm text-slate-500 justify-end">
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { allNews } from '../data/news.js'

// Henter rute-parameteren (nyhedens id fra URLen)
const route = useRoute()
const id = Number(route.params.id)
// Finder den nyhed som brugeren har klikket på
const article = allNews.find((a) => a.id === id)

// Share dropdown state
const shareOpen = ref(false)
const shareUrl = ref(typeof window !== 'undefined' ? window.location.href : '')
const shareMenuRef = ref(null)

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (shareMenuRef.value && !shareMenuRef.value.contains(event.target)) {
    shareOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
