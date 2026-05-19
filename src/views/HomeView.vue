
<!-- Her vises det fra forsiden -->

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { categories } from '../data/categories'
import { allNews, getTranslatedNewsItem } from '../data/news'

const { t, locale } = useI18n()

// Direkte oversættelse af kategori indhold
const getCategoryTranslations = () => {
  const translations = {
    da: {
      0: { title: 'Hvem er vi?', content: 'Business DE-DK arbejder for at forbedre samarbejdet mellem virksomheder, institutioner og initiativer i den nordtyske og syddanske grænseregion. Projektet fokuserer på at optimere erhvervssamarbejdet, tackle manglen på arbejdskraft og gøre regionen mere attraktiv for både virksomheder og talent fra hele verden.' },
      1: { title: 'Mål og initiativer', content: 'Business DE-DK arbejder med at kortlægge regionens muligheder, behov og eksisterende initiativer gennem data og indsigt. Derudover etableres et grænseoverskridende erhvervsnetværk for virksomheder og eksperter med fokus på samarbejde og videndeling. Gennem en mediekanal formidles analyser, viden og relevante perspektiver, som skal styrke synligheden omkring regionens udvikling og potentialer. Samtidig undersøges mulighederne for at etablere et grænseoverskridende erhvervsråd, der kan understøtte samarbejde på tværs af grænsen. Et centralt fokusområde er også at tiltrække og fastholde kvalificeret arbejdskraft for at skabe vækst og udvikling i regionen. Business DE-DK bidrager dermed til at skabe overblik, facilitere samarbejde og styrke den grænseoverskridende erhvervsudvikling.' },
      2: { title: 'Hvad kan vi tilbyde dig?', content: 'Vi skaber et stærkt netværk, hvor virksomheder kan mødes, opbygge relationer og styrke hinandens forretning både fysisk og digitalt. Gennem vores platform og nyhedsbrev formidler vi aktuelle nyheder, inspirerende virksomhedsfortællinger og relevante cases fra regionen, så det er nemt at holde sig opdateret og finde ny inspiration. Samtidig arrangerer vi netværksmøder, temadage og workshops, hvor virksomheder får adgang til ny viden, faglige input og mulighed for at skabe værdifulde forbindelser med andre aktører i grænseregionen. Ved at samle erhvervslivet og synliggøre regionens muligheder arbejder vi desuden aktivt for at tiltrække arbejdskraft, investeringer og nye samarbejdspartnere.' }
    },
    de: {
      0: { title: 'Wer sind wir?', content: 'Business DE-DK arbeitet daran, die Zusammenarbeit zwischen Unternehmen, Institutionen und Initiativen in der nordteutschen und süddänischen Grenzregion zu verbesseren. Das Projekt konzentriert sich darauf, die Geschäftstätigkeit zu optimieren, den Fachkräftemangel zu bekämpfen und die Region für Unternehmen und Talente aus der ganzen Welt attraktiver zu machen.' },
      1: { title: 'Ziele und Initiativen', content: 'Business DE-DK arbeitet daran, die Chancen, Bedürfnisse und bestehenden Initiativen der Region durch Daten und Erkenntnisse zu kartografieren. Darüber hinaus wird ein grenzüberschreitendes Geschäftsnetzwerk für Unternehmen und Experten mit Schwerpunkt auf Zusammenarbeit und Wissenstransfer aufgebaut. Durch einen Medienkanal werden Analysen, Wissen und relevante Perspektiven vermittelt, um die Sichtbarkeit des Regionalen Entwicklungs- und Potenzials zu stärken. Gleichzeitig werden die Möglichkeiten zur Gründung eines grenzüberschreitenden Wirtschaftsrats untersucht, der die grenzüberschreitende Zusammenarbeit unterstützen kann. Ein zentraler Fokusbereich ist auch die Gewinnung und Bindung von qualifizierten Arbeitskräften, um Wachstum und Entwicklung in der Region zu schaffen. Business DE-DK trägt somit dazu bei, einen Überblick zu schaffen, Zusammenarbeit zu erleichtern und die grenzüberschreitende Geschäftsentwicklung zu stärken.' },
      2: { title: 'Was können wir dir anbieten?', content: 'Wir schaffen ein starkes Netzwerk, in dem Unternehmen sich treffen, Beziehungen aufbauen und sich gegenseitig verschärfen können - physisch und digital. Durch unsere Plattform und unseren Newsletter vermitteln wir aktuelle Nachrichten, inspirierende Unternehmensgeschichten und relevante Fallstudien aus der Region, so dass es leicht ist, auf dem Laufenden zu bleiben und neue Inspirationen zu finden. Gleichzeitig organisieren wir Netzwerktreffen, Themeseminare und Workshops, auf denen Unternehmen Zugang zu neuem Wissen, professionelle Inputs und die Möglichkeit erhalten, wertvolle Verbindungen mit anderen Akteuren in der Grenzregion zu schaffen. Durch die Zusammenführung des Übernativen Lebens und die Verdeutlichung der Chancen der Region arbeiten wir aktiv daran, Arbeitskräfte, Investitionen und neue Partner anzulocken.' }
    },
    en: {
      0: { title: 'Who are we?', content: 'Business DE-DK works to improve cooperation between companies, institutions and initiatives in the North German and South Danish border region. The project focuses on optimizing business cooperation, addressing the shortage of skilled labor, and making the region more attractive for both companies and talent from around the world.' },
      1: { title: 'Goals and initiatives', content: 'Business DE-DK works to map the region\'s opportunities, needs and existing initiatives through data and insights. In addition, a cross-border business network for companies and experts is established with a focus on collaboration and knowledge sharing. Through a media channel, analyses, knowledge and relevant perspectives are communicated to strengthen visibility around the region\'s development and potential. At the same time, the possibilities of establishing a cross-border business council that can support cooperation across borders are being explored. A central focus area is also to attract and retain qualified labor to create growth and development in the region. Business DE-DK thus contributes to creating overview, facilitating cooperation and strengthening cross-border business development.' },
      2: { title: 'What can we offer you?', content: 'We create a strong network where companies can meet, build relationships and strengthen each other\'s business both physically and digitally. Through our platform and newsletter, we communicate current news, inspiring company stories and relevant cases from the region, making it easy to stay updated and find new inspiration. At the same time, we organize networking meetings, theme days and workshops where companies gain access to new knowledge, professional input and the opportunity to build valuable connections with other players in the border region. By bringing the business community together and highlighting the region\'s opportunities, we also actively work to attract labor, investments and new partnerships.' }
    }
  }
  return translations[locale.value] || translations.da
}

// Funktion der oversætter kategori titler og indhold baseret på sproget
const getTranslatedCategories = () => {
  const catTranslations = getCategoryTranslations()
  return categories.map((cat, idx) => ({
    ...cat,
    title: catTranslations[idx]?.title || cat.title,
    content: catTranslations[idx]?.content || cat.content
  }))
}

// Helper to get translated news data
const getTranslatedNews = (newsId) => {
  const news = allNews.find((item) => item.id === newsId)
  return news ? getTranslatedNewsItem(news, locale.value) : null
}

const translatedNewsMap = computed(() => {
  locale.value
  const map = {}
  allNews.forEach((news) => {
    map[news.id] = getTranslatedNewsItem(news, locale.value)
  })
  return map
})

// Computed property som reagerer på sproget
const translatedCategories = computed(() => {
  // locale.value sikrer at denne computed virker igen når sproget ændres
  locale.value
  return getTranslatedCategories()
})

// Aktiv tab tracker
const activeTab = ref(null)

// Nyheds karrusel
const currentIndex = ref(0)

const highlightedNews = computed(() => {
  locale.value // Force reactivity on locale change
  return allNews[currentIndex.value]
})

const sideNews = computed(() => {
  locale.value // Force reactivity on locale change
  
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
    class="relative min-h-156 w-screen overflow-hidden bg-primary-darkest"
    style="margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw);"
  >
    <!-- Baggrundsvideo (loop bag overlay) -->
    <div class="absolute inset-0">
      <video
        class="absolute left-1/2 top-1/2 h-[120%] w-[220%] -translate-x-1/2 -translate-y-1/2 object-cover"
        autoplay
        muted
        loop
        playsinline
      >
        <source src="/src/assets/videoes/Videoloop.mp4" type="video/mp4" />
      </video>
    </div>
    <!-- Blå overlay -->
    <div class="absolute inset-0 bg-linear-to-r from-primary-darkest via-primary-darkest/80 to-primary-darkest/40"></div>
    <!-- Content -->
    <div class="relative z-10 grid grid-cols-12 gap-4 px-8 pt-60 pb-16 lg:pb-20 w-full">
      <div class="col-span-12 flex flex-col text-neutral-light lg:col-span-8 lg:col-start-2">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-light/70">{{ $t('home.welcome') }}</p>
      <h1 class="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl text-white">{{ $t('home.title') }}</h1>
      <p class="mt-5 max-w-2xl text-sm leading-7 text-neutral-light/85 sm:text-base">
        {{ $t('home.subtitle') }}
      </p>
      <div class="mt-8 flex flex-wrap gap-4">
        <RouterLink
          to="/nyheder"
          class=" border border-white bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          {{ $t('home.newsBtn') }}
        </RouterLink>
        <RouterLink
          to="/jobportal"
          class=" border border-white bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          {{ $t('home.jobBtn') }}
        </RouterLink>
      </div>
      </div>
    </div>
  </header>

  <!-- Ny sektion: Tekst kategorier med billede -->
  <section class="w-full bg-white">
    <div class="grid grid-cols-12 gap-4 px-8 pt-12">
      <div class="col-start-2 col-end-7">
        <h2 class="text-2xl font-light text-primary-darkest sm:text-3xl uppercase">{{ $t('home.faq') }}</h2>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 px-8 py-12">
      <!-- Venstre side: Kategorier  -->
      <div class="col-start-2 col-end-7">
        <div class="space-y-0">
          <!-- Alle kategorier som klikbare -->
          <div
            v-for="(category, index) in translatedCategories"
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
          src="/src/assets/logos/Map.svg"
          alt="Grænse billede"
          class="w-full h-auto object-cover shadow-lg"
        />
      </div>
    </div>
  </section>

  <!-- Nyheds Karrusel -->
  <section class="w-full px-8 mb-8">
    <!-- Karrusel header (titel + link) -->
    <div class="grid grid-cols-12 mx-auto max-w-full mb-14">
      <div class="flex justify-start col-start-2 col-end-6">
        <h2 class="text-2xl font-light text-primary-darkest sm:text-3xl uppercase">{{ $t('home.latestNews') }}</h2>
      </div>
      <div class="flex justify-center col-start-10 col-end-12">
        <RouterLink to="/nyheder" class="uppercase text-sm font-light text-primary-darkest hover:text-primary-light transition-colors">
          {{ $t('home.allNews') }}
        </RouterLink>
      </div>
    </div>
    <!-- Karrusel container  -->
    <div class="grid grid-cols-12 gap-4 py-8 mx-auto max-w-full">
      <div class="col-start-2 col-end-12 relative">

      <!-- Karrusel kort -->
      <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-[1fr_2fr_1fr]">
        <article
          v-if="sideNews[0]"
          class="relative overflow-hidden bg-cover bg-center  transition-all duration-220 hover:scale-105 hover:-translate-y-1 min-h-56 z-10 cursor-pointer"
          :style="{ backgroundImage: `url(${sideNews[0].image})` }"
          role="button"
          tabindex="0"
          @click="setCurrent(sideNews[0].id)"
          @keydown.enter="setCurrent(sideNews[0].id)"
        >
          <div class="absolute inset-0 bg-linear-to-b from-primary-darkest/18 to-primary-darkest/82"></div>
          <div class="relative z-40 flex h-full flex-col justify-end p-4">
            <p class="text-sm text-neutral-light/90">{{ translatedNewsMap[sideNews[0].id]?.title || sideNews[0].title }}</p>
          </div>
        </article>

        <article
          v-if="highlightedNews"
          class="relative overflow-hidden bg-cover bg-center transition-all duration-220 hover:scale-100 hover:-translate-y-1 min-h-96 scale-105 shadow-2xl z-30"
          :style="{ backgroundImage: `url(${highlightedNews.image})` }"
        >
          <div class="absolute inset-0 bg-linear-to-b from-primary-darkest/18 to-primary-darkest/82"></div>
          <div class="relative z-40 flex h-full flex-col justify-end p-4">
            <p class="text-lg text-neutral-light sm:text-2xl">{{ translatedNewsMap[highlightedNews.id]?.title || highlightedNews.title }}</p>
            <RouterLink :to="{ name: 'nyhed', params: { id: highlightedNews.id } }" class="inline-block mt-2 px-4 py-2 text-sm text-white border border-white/70 hover:bg-white/20 transition-colors duration-200">{{ $t('home.readMore') }}</RouterLink>
          </div>
        </article>

        <article
          v-if="sideNews[1]"
          class="relative overflow-hidden bg-cover bg-center transition-all duration-220 hover:scale-105 hover:-translate-y-1 min-h-56 z-10 cursor-pointer"
          :style="{ backgroundImage: `url(${sideNews[1].image})` }"
          role="button"
          tabindex="0"
          @click="setCurrent(sideNews[1].id)"
          @keydown.enter="setCurrent(sideNews[1].id)"
        >
          <div class="absolute inset-0 bg-linear-to-b from-primary-darkest/18 to-primary-darkest/82"></div>
          <div class="relative z-40 flex h-full flex-col justify-end p-4">
            <p class="text-sm text-neutral-light/90">{{ translatedNewsMap[sideNews[1].id]?.title || sideNews[1].title }}</p>
          </div>
        </article>
      </div>

      <!-- Højre pil -->
      <button
        class="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary-darkest/20 bg-neutral-light text-primary-darkest text-lg hover:bg-primary-light hover:-translate-y-[52%] transition-all duration-160 flex items-center justify-center"
        style="right: -60px"
        type="button"
        aria-label="Næste nyhed"
        @click="nextNews"
      >
        &#10095;
      </button>
            <!-- Venstre pil (udenfor kortet) -->
      <button
        class="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary-darkest/20 bg-neutral-light text-primary-darkest text-lg hover:bg-primary-light hover:-translate-y-[52%] transition-all duration-160 flex items-center justify-center"
        style="left: -60px"
        type="button"
        aria-label="Forrige nyhed"
        @click="previousNews"
      >
        &#10094;
      </button>
      </div>
    </div>
  </section>
</template>

