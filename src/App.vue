<!-- Kommentare er tænkt som at skulle læses ned af, så du læser fra toppen også nedenunder kommer det kommentaren handler om  -->

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BusinessLogo from './assets/logos/Business logo.svg'
import FooterComponent from './components/FooterComponent.vue'

// Styrer søgefeltet: åben/lukket tilstand
const isSearchOpen = ref(false)
const searchContainerRef = ref(null)

// Åbner eller lukker søgefeltet
const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
}

// Lukker søgefelt når der klikkes uden for det (for god brugeroplevelse)
const onDocumentClick = (event) => {
  if (!isSearchOpen.value) return
  const target = event.target
  if (!searchContainerRef.value || !target) return
  if (!searchContainerRef.value.contains(target)) {
    isSearchOpen.value = false
  }
}

// Eventlisteners for søgefelt
onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <!-- Header og navigationsbar -->
  <header class="w-full bg-primary-darkest! relative z-40">
    <nav class="grid grid-cols-12 gap-4 px-8 py-4">
      <!-- Logo og navigation links -->
      <div class="col-start-2 col-end-10 flex items-center gap-12">
        <RouterLink to="/" class="flex items-center">
          <img :src="BusinessLogo" alt="Business Region Logo" class="h-12 shrink-0" />
        </RouterLink>
        <div class="flex gap-8">
          <RouterLink to="/nyheder" class="text-neutral-light no-underline font-light hover:text-primary-light transition-colors duration-300">Nyheder & Indsigter</RouterLink>
          <RouterLink to="/about" class="text-neutral-light no-underline font-light hover:text-primary-light transition-colors duration-300">Om os</RouterLink>
          <RouterLink to="/events" class="text-neutral-light no-underline font-light hover:text-primary-light transition-colors duration-300">Events</RouterLink>
          <RouterLink to="/jobportal" class="text-neutral-light no-underline font-light hover:text-primary-light transition-colors duration-300">Jobportal</RouterLink>
        </div>
      </div>
      <!-- Menu bar område med dropdown, søg og kontakt -->
      <div class="col-start-10 col-end-11 flex justify-end gap-0 justify-self-end">
        <!-- Sprog dropdown menu -->
        <div class="relative group">
          <!-- Oversættelses knap for dansk -->
          <button class="bg-neutral-light text-primary-darkest px-4 py-2 font-light rounded-l-lg hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 whitespace-nowrap flex items-center gap-1 h-full min-h-10 min-w-16">
            DA
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <!-- Dropdown menu med sprogobjekter -->
          <div
            class="absolute left-0 z-50 bg-neutral-light text-primary-darkest rounded-b shadow-lg w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top"
            style="top: 100%; margin-top: 0;"
          >
            <button class="block w-full text-left px-4 py-2 hover:bg-primary-light hover:text-neutral-light transition-colors duration-300" @click="$emit('change-lang', 'da')">Dansk</button>
            <button class="block w-full text-left px-4 py-2 hover:bg-primary-light hover:text-neutral-light transition-colors duration-300" @click="$emit('change-lang', 'de')">Tysk</button>
            <button class="block w-full text-left px-4 py-2 hover:bg-primary-light hover:text-neutral-light transition-colors duration-300" @click="$emit('change-lang', 'en')">Engelsk</button>
          </div>
        </div>
        <!-- Søgefelt -->
        <div ref="searchContainerRef" class="relative flex items-center border-l border-r border-primary-darkest bg-neutral-light px-3 py-2">
          <button type="button" class="text-primary-darkest flex items-center" @click="toggleSearch" aria-label="Åbn søgning">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#0D1B2A" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/></svg>
          </button>
          <input v-if="isSearchOpen" type="text" placeholder="Søg..." class="bg-neutral-light text-primary-darkest ml-2 pr-2 py-1 rounded focus:outline-none w-24 sm:w-32 md:w-40 transition-all duration-300" />
        </div>
        <!-- Link til kontakt os siden -->
        <RouterLink to="/kontakt" class="bg-neutral-light text-primary-darkest px-4 py-2 font-light rounded-r-lg hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 whitespace-nowrap flex items-center">Kontakt Os</RouterLink>
      </div>
    </nav>
  </header>

  <!-- Router view som viser indholdet fra hver side -->
  <RouterView />

  <!-- Footer -->
  <FooterComponent />
</template>

<style scoped>
</style>
