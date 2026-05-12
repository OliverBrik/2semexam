
<!-- Her vises det fra forsiden -->

<script setup>
import { ref } from 'vue'
// Aktiv tab tracker
const activeTab = ref(null)

// Kategori data
const categories = [
  {
    title: 'Hvem er vi?',
    content: 'Business Region er en organisation dedikeret til at skabe stærke forbindelser mellem virksomheder i grænseregionen. Vi arbejder for at fremme vækst, samarbejde og nye muligheder på tværs af grænserne.'
  },
  {
    title: 'Hvad kan vi tilbyde dig?',
    content: 'Vi tilbyder en bred palette af services herunder netværksarrangementer, erhvervsrådgivning, projektsamarbejde og adgang til relevante kontakter i grænseregionen. Vores fokus er på at skabe værdi for vores medlemmer.'
  },
  {
    title: 'Mål og initiativer',
    content: 'Vores mål er at være en drivkraft for økonomisk udvikling i grænseregionen. Vi gennemfører initiativerne inden for innovation, uddannelse og bæredygtig udvikling for at sikre langsigtet vækst og velfærd.'
  }
]
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
      <div class="col-start-7 col-end-11 flex items-center justify-center">
        <img
          src="https://picsum.photos/600/800"
          alt="Grænse billede"
          class="w-full h-auto object-cover shadow-lg"
        />
      </div>
    </div>
  </section>
</template>
