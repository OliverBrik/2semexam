<!-- Kommentare er tænkt som at skulle læses ned af, så du læser fra toppen også nedenunder kommer det kommentaren handler om  -->

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BusinessLogo from './assets/logos/Business logo.svg'
import FooterComponent from './components/FooterComponent.vue'
import { allNews, getTranslatedNewsItem } from './data/news'
import { businessNetworkJobs } from './data/businessnetwork'

// i18n setup for at skifte sproget
const { locale, t, tm } = useI18n()

// Map locale value til sprogets kode for at vise i knappen
const currentLanguageCode = computed(() => {
  const languageCodes = { da: 'DA', de: 'DE', en: 'EN' }
  return languageCodes[locale.value] || 'DA'
})

const changeLang = (lang) => {
  locale.value = lang
}

// Holder styr på om søgningen i navbaren er åben, og hvad brugeren har skrevet
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchContainerRef = ref(null)
const router = useRouter()
const route = useRoute()

// Samler de vigtigste sider og data, så søgefeltet kan foreslå relevante destinationer
const searchEntries = computed(() => [
  { label: t('nav.home'), hint: t('nav.homeHint'), path: '/' },
  { label: t('nav.news'), hint: t('nav.newsHint'), path: '/nyheder' },
  { label: t('nav.about'), hint: t('nav.aboutHint'), path: '/about' },
  { label: t('nav.events'), hint: t('nav.eventsHint'), path: '/events' },
  { label: t('nav.jobportal'), hint: t('nav.jobportalHint'), path: '/jobportal' },
  { label: t('nav.contact'), hint: t('nav.contactHint'), path: '/kontakt' },
  ...allNews.map((news) => {
    const translatedNews = getTranslatedNewsItem(news, locale.value)
    const categories = tm('newsCategories')

    return {
      label: translatedNews.title,
      hint: categories?.[news.category] || news.category,
      path: { name: 'nyhed', params: { id: news.id } },
    }
  }),
  ...businessNetworkJobs.map((job) => ({
    label: job.company,
    hint: job.location,
    path: '/jobportal',
  })),
])

// Filtrerer forslagene ned til de resultater, der matcher det brugeren skriver
const suggestionItems = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  const entries = searchEntries.value

  if (!isSearchOpen.value) return []

  if (!query) {
    return entries.slice(0, 6)
  }

  return entries.filter((entry) => {
    return (
      entry.label.toLowerCase().includes(query) ||
      entry.hint.toLowerCase().includes(query)
    )
  }).slice(0, 8)
})

// Lukker søgningen helt og rydder feltet, så navbaren går tilbage til normal tilstand
const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
}

// Skifter mellem lukket og åbent søgefelt, når der klikkes på søgeikonet
const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    searchQuery.value = ''
  }
}

// Sørger for at søgningen forbliver åben, når brugeren interagerer med feltet
const openSearch = () => {
  isSearchOpen.value = true
}

// Når et forslag vælges, navigerer vi direkte til det og lukker søgningen igen
const goToSuggestion = async (item) => {
  await router.push(item.path)
  closeSearch()
}

// Enter-tasten springer til det første relevante forslag i listen
const submitSearch = async () => {
  const firstMatch = suggestionItems.value[0]
  if (firstMatch) {
    await goToSuggestion(firstMatch)
  }
}

// Lukker søgningen, når man klikker uden for feltet, så navbaren ikke bliver stående åben
const onDocumentClick = (event) => {
  if (!isSearchOpen.value) return
  const target = event.target
  if (!searchContainerRef.value || !target) return
  if (!searchContainerRef.value.contains(target)) {
    closeSearch()
  }
}

watch(
  () => route.fullPath,
  () => {
    closeSearch()
  }
)

// Lytter på klik i dokumentet, så søgningen kan lukke igen ved klik udenfor boksen
onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <!-- Fast topbar med logo, navigation og søgefunktion -->
  <header class="w-full bg-primary-darkest! relative z-40">
    <nav class="grid grid-cols-12 gap-4 px-8 py-4">
      <!-- Venstre side: logo og hovednavigation -->
      <div class="col-start-2 col-end-10 flex items-center gap-8 min-w-0 overflow-hidden">
        <RouterLink to="/" class="flex items-center shrink-0">
          <img :src="BusinessLogo" alt="Business Region Logo" class="h-12 shrink-0" />
        </RouterLink>
        <div class="flex gap-4 flex-wrap items-center min-w-0">
          <RouterLink to="/nyheder" class="text-neutral-light no-underline font-light hover:text-primary-light transition-colors duration-300 text-sm lg:text-base">{{ $t('nav.news') }}</RouterLink>
          <RouterLink to="/about" class="text-neutral-light no-underline font-light hover:text-primary-light transition-colors duration-300 text-sm lg:text-base">{{ $t('nav.about') }}</RouterLink>
          <RouterLink to="/events" class="text-neutral-light no-underline font-light hover:text-primary-light transition-colors duration-300 text-sm lg:text-base">{{ $t('nav.events') }}</RouterLink>
          <RouterLink to="/jobportal" class="text-neutral-light no-underline font-light hover:text-primary-light transition-colors duration-300 text-sm lg:text-base">{{ $t('nav.jobportal') }}</RouterLink>
        </div>
      </div>
      <!-- Højre side: sprogvalg, søgning og kontaktknap -->
      <div class="col-start-10 col-end-12 flex justify-end gap-0 justify-self-end shrink-0">
        <!-- Sprogmenu med dropdown -->
        <div class="relative group shrink-0">
          <!-- Selve sprogknappen, som fungerer som trigger til dropdownen -->
          <button class="bg-neutral-light text-primary-darkest px-4 py-2 font-light rounded-l-lg hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 whitespace-nowrap flex items-center gap-1 h-full min-h-10 min-w-16 shrink-0">
            {{ currentLanguageCode }}
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <!-- Dropdownen vises kun, når der hoveres over sprogknappen -->
          <div
            class="absolute left-0 bg-neutral-light text-primary-darkest rounded-b shadow-lg w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top"
            style="top: 100%; margin-top: 0;"
          >
            <button class="block w-full text-left px-2 py-2 hover:bg-primary-light hover:text-neutral-light transition-colors duration-300" @click="changeLang('da')">Dansk</button>
            <button class="block w-full text-left px-2 py-2 hover:bg-primary-light hover:text-neutral-light transition-colors duration-300" @click="changeLang('de')">Deutsch</button>
            <button class="block w-full text-left px-2 py-2 hover:bg-primary-light hover:text-neutral-light transition-colors duration-300" @click="changeLang('en')">English</button>
          </div>
        </div>
        <!-- Søgeikon og inputfelt, som åbner forslag direkte i navbaren -->
        <div ref="searchContainerRef" class="relative flex items-center border-l border-r border-primary-darkest bg-neutral-light px-3 py-2 shrink-0">
          <button type="button" class="text-primary-darkest flex items-center" @click="toggleSearch" aria-label="Åbn søgning">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#0D1B2A" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/></svg>
          </button>
          <input
            v-if="isSearchOpen"
            v-model="searchQuery"
            type="text"
            :placeholder="$t('nav.searchPlaceholder')"
            class="bg-neutral-light text-primary-darkest ml-2 pr-2 py-1 rounded focus:outline-none w-24 sm:w-32 md:w-40 transition-all duration-300"
            @focus="openSearch"
            @input="openSearch"
            @keydown.enter.prevent="submitSearch"
          />

          <!-- Forslagslisten bliver placeret lige under søgefeltet for hurtig navigation -->
          <div
            v-if="isSearchOpen"
            class="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-md border border-primary-darkest/10 bg-neutral-light shadow-xl"
          >
            <div class="border-b border-primary-darkest/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-darkest/55">
              Forslag
            </div>
            <button
              v-for="item in suggestionItems"
              :key="item.label + item.hint"
              type="button"
              class="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-primary-light/10"
              @click="goToSuggestion(item)"
            >
              <span class="mt-1 h-2 w-2 rounded-full bg-primary-base"></span>
              <span class="flex-1">
                <span class="block text-sm font-medium text-primary-darkest">{{ item.label }}</span>
                <span class="block text-xs text-primary-darkest/60">{{ item.hint }}</span>
              </span>
            </button>
            <div v-if="suggestionItems.length === 0" class="px-4 py-4 text-sm text-primary-darkest/60">
              Ingen forslag matcher din søgning.
            </div>
          </div>
        </div>
        <!-- Fast kontaktknap, så brugeren altid kan komme hurtigt til kontakt -->
        <RouterLink to="/kontakt" class="bg-neutral-light text-primary-darkest px-4 py-2 font-light rounded-r-lg hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 whitespace-nowrap flex items-center">{{ $t('nav.contact') }}</RouterLink>
      </div>
    </nav>
  </header>

  <!-- Selve sideindholdet skifter her, alt efter hvilken route der er aktiv -->
  <RouterView />

  <!-- Fælles footer, som vises på alle sider -->
  <FooterComponent />
</template>

<style scoped>
</style>
