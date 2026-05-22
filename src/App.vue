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

// Language menu open state for mobile (click to toggle)
const isLangOpen = ref(false)
const langMenuRef = ref(null)
const toggleLangMenu = (event) => {
  isLangOpen.value = !isLangOpen.value
  if (event) event.stopPropagation()
}

const changeLang = (lang) => {
  locale.value = lang
  isLangOpen.value = false
}

// Holder styr på om søgningen i navbaren er åben, og hvad brugeren har skrevet
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchContainerRef = ref(null)
const router = useRouter()
const route = useRoute()
const siteName = 'Business DE-DK'

const seoRouteContent = computed(() => {
  const path = route.path

  if (path === '/') {
    return {
      title: `${t('home.title')} | ${siteName}`,
      description: t('home.subtitle'),
    }
  }

  if (path === '/nyheder') {
    return {
      title: `${t('news.title')} | ${siteName}`,
      description: t('news.description'),
    }
  }

  if (path === '/about') {
    return {
      title: `${t('about.title')} | ${siteName}`,
      description: t('about.description'),
    }
  }

  if (path === '/events') {
    return {
      title: `${t('events.title')} | ${siteName}`,
      description: t('events.description'),
    }
  }

  if (path === '/jobportal') {
    return {
      title: `${t('jobportal.title')} | ${siteName}`,
      description: t('jobportal.description'),
    }
  }

  if (path === '/kontakt') {
    return {
      title: `${t('contact.title')} | ${siteName}`,
      description: t('contact.description'),
    }
  }

  if (path.startsWith('/nyhed/')) {
    const newsId = Number(route.params.id)
    const translatedNews = getTranslatedNewsItem(
      allNews.find((item) => item.id === newsId),
      locale.value,
    )

    return {
      title: `${translatedNews?.title || t('nav.news')} | ${siteName}`,
      description: translatedNews?.summary || t('news.description'),
    }
  }

  return {
    title: siteName,
    description: t('news.description'),
  }
})

const updateSeoMeta = () => {
  if (typeof document === 'undefined') return

  document.title = seoRouteContent.value.title

  const descriptionContent = seoRouteContent.value.description
  const selectors = [
    'meta[name="description"]',
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
  ]

  selectors.forEach((selector) => {
    let tag = document.head.querySelector(selector)

    if (!tag) {
      tag = document.createElement('meta')

      if (selector.includes('og:')) {
        tag.setAttribute('property', 'og:description')
      } else if (selector.includes('twitter:')) {
        tag.setAttribute('name', 'twitter:description')
      } else {
        tag.setAttribute('name', 'description')
      }

      document.head.appendChild(tag)
    }

    tag.setAttribute('content', descriptionContent)
  })

  let ogTitle = document.head.querySelector('meta[property="og:title"]')
  if (!ogTitle) {
    ogTitle = document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    document.head.appendChild(ogTitle)
  }
  ogTitle.setAttribute('content', seoRouteContent.value.title)

  let twitterTitle = document.head.querySelector('meta[name="twitter:title"]')
  if (!twitterTitle) {
    twitterTitle = document.createElement('meta')
    twitterTitle.setAttribute('name', 'twitter:title')
    document.head.appendChild(twitterTitle)
  }
  twitterTitle.setAttribute('content', seoRouteContent.value.title)

  let ogSiteName = document.head.querySelector('meta[property="og:site_name"]')
  if (!ogSiteName) {
    ogSiteName = document.createElement('meta')
    ogSiteName.setAttribute('property', 'og:site_name')
    document.head.appendChild(ogSiteName)
  }
  ogSiteName.setAttribute('content', siteName)
}

watch(
  seoRouteContent,
  () => {
    updateSeoMeta()
  },
  { immediate: true },
)

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
  const target = event.target
  if (!target) return

  // Close search if open and clicked outside
  if (isSearchOpen.value) {
    if (!searchContainerRef.value || !searchContainerRef.value.contains(target)) {
      closeSearch()
    }
  }

  // Close language menu if open and clicked outside
  if (isLangOpen.value) {
    if (!langMenuRef.value || !langMenuRef.value.contains(target)) {
      isLangOpen.value = false
    }
  }
}

watch(
  () => route.fullPath,
  () => {
    closeSearch()
  }
)

watch(
  () => locale.value,
  () => {
    updateSeoMeta()
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
    <nav class="grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-12 md:px-8">
      <!-- Venstre side: logo og hovednavigation -->
      <div class="col-span-1 flex min-w-0 flex-col gap-4 overflow-hidden md:col-start-2 md:col-end-10 md:flex-row md:items-center md:gap-8">
        <RouterLink to="/" class="flex items-center shrink-0">
          <img :src="BusinessLogo" alt="Business Region Logo" class="h-12 shrink-0" loading="eager" decoding="async" />
        </RouterLink>
        <div class="flex min-w-0 flex-wrap items-center gap-3 md:gap-4">
          <RouterLink to="/nyheder" class="text-neutral-light no-underline font-light hover:text-primary-light transition-colors duration-300 text-sm lg:text-base">{{ $t('nav.news') }}</RouterLink>
          <RouterLink to="/about" class="text-neutral-light no-underline font-light hover:text-primary-light transition-colors duration-300 text-sm lg:text-base">{{ $t('nav.about') }}</RouterLink>
          <RouterLink to="/events" class="text-neutral-light no-underline font-light hover:text-primary-light transition-colors duration-300 text-sm lg:text-base">{{ $t('nav.events') }}</RouterLink>
          <RouterLink to="/jobportal" class="text-neutral-light no-underline font-light hover:text-primary-light transition-colors duration-300 text-sm lg:text-base">{{ $t('nav.jobportal') }}</RouterLink>
        </div>
      </div>
      <!-- Højre side: sprogvalg, søgning og kontaktknap -->
      <div class="col-span-1 flex w-full flex-wrap items-center justify-start gap-2 shrink-0 md:col-start-10 md:col-end-12 md:w-auto md:justify-end md:gap-0 md:justify-self-end">
        <!-- Sprogmenu med dropdown -->
        <div ref="langMenuRef" class="relative shrink-0 group">
          <!-- Selve sprogknappen, som fungerer som trigger til dropdownen -->
          <button @click="toggleLangMenu" :aria-expanded="isLangOpen" class="bg-neutral-light text-primary-darkest h-10 px-3 text-sm font-light rounded-none hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 whitespace-nowrap flex items-center justify-center gap-1 min-w-14 shrink-0">
            {{ currentLanguageCode }}
            <svg class="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <!-- Dropdown vises på klik (mobil), eller via class når isLangOpen er true -->
          <div
            :class="['absolute left-0 top-full z-50 mt-0 flex w-max flex-row overflow-hidden bg-neutral-light text-primary-darkest shadow-lg transition-all duration-200 origin-top md:w-full md:flex-col md:rounded-b group-hover:opacity-100 group-hover:visible', isLangOpen ? 'opacity-100 visible' : 'opacity-0 invisible']"
            style="top: 100%; margin-top: 0;"
          >
            <button class="w-20 shrink-0 px-3 py-2 text-center text-sm whitespace-nowrap hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 md:block md:w-full md:px-2 md:text-left" @click="changeLang('da')">Dansk</button>
            <button class="w-20 shrink-0 px-3 py-2 text-center text-sm whitespace-nowrap hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 md:block md:w-full md:px-2 md:text-left" @click="changeLang('de')">Deutsch</button>
            <button class="w-20 shrink-0 px-3 py-2 text-center text-sm whitespace-nowrap hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 md:block md:w-full md:px-2 md:text-left" @click="changeLang('en')">English</button>
          </div>
        </div>
        <!-- Søgeikon og inputfelt, som åbner forslag direkte i navbaren -->
        <div ref="searchContainerRef" class="relative flex h-10 w-auto min-w-0 flex-none items-center border border-primary-darkest bg-neutral-light px-0 py-0 shrink-0 rounded-none md:w-auto md:border-l md:border-r">
          <button type="button" class="bg-neutral-light text-primary-darkest h-10 px-3 text-sm font-light rounded-none hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 whitespace-nowrap flex items-center justify-center border-r border-primary-darkest/10 w-10 md:w-16 shrink-0" @click="toggleSearch" aria-label="Åbn søgning">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#0D1B2A" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/></svg>
          </button>
          <input
            v-if="isSearchOpen"
            v-model="searchQuery"
            type="text"
            :placeholder="$t('nav.searchPlaceholder')"
            class="min-w-0 flex-1 h-full bg-neutral-light text-primary-darkest ml-1 pr-3 py-0 text-sm rounded-none focus:outline-none w-16 max-w-16 sm:w-24 sm:max-w-none md:w-40 transition-all duration-300"
            @focus="openSearch"
            @input="openSearch"
            @keydown.enter.prevent="submitSearch"
          />

          <!-- Forslagslisten bliver placeret lige under søgefeltet for hurtig navigation -->
          <div
            v-if="isSearchOpen"
            class="absolute left-0 right-0 top-full z-50 mt-2 max-h-[60vh] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] overflow-y-auto overflow-x-hidden rounded-md border border-primary-darkest/10 bg-neutral-light shadow-xl md:left-auto md:right-0 md:w-80 md:max-w-none"
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
        <RouterLink to="/kontakt" class="bg-neutral-light text-primary-darkest h-10 px-3 text-sm font-light rounded-none hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 whitespace-nowrap flex items-center justify-center min-w-20 shrink-0">{{ $t('nav.contact') }}</RouterLink>
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
