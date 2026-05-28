<template>
  <main class="grid w-full grid-cols-12 gap-4 px-8 py-12 text-primary-darkest">
    <RouterLink
      to="/events"
      class="col-span-12 inline-flex items-center text-sm font-medium text-primary-darkest transition-colors hover:text-primary-base lg:col-start-2 lg:col-end-12"
    >
      ← {{ $t('nav.events') }}
    </RouterLink>

    <article v-if="event" class="col-span-12 mt-6 overflow-hidden bg-white shadow-sm ring-1 ring-black/5 lg:col-start-2 lg:col-end-12">
      <header class="border-b border-slate-100 px-6 py-6 md:px-8">
        <p class="text-sm font-medium uppercase tracking-[0.14em] text-primary-base">{{ getCategoryTranslation(event.category) }}</p>
        <h1 class="mt-2 text-3xl font-light text-primary-darkest sm:text-4xl">
          {{ translatedEvent?.title || event.title }}
        </h1>
        <div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>{{ getLocationTranslation(event.location) }}</span>
          <span class="h-1 w-1 bg-slate-300"></span>
          <span>{{ new Date(event.date).toLocaleDateString('da-DK') }} kl. {{ event.time }}</span>
          <span class="h-1 w-1 bg-slate-300"></span>
          <span>{{ event.attendees }} deltagere</span>
        </div>
      </header>

      <div class="mx-6 mt-6 overflow-hidden bg-black shadow-sm md:mx-8">
        <img
          :src="event.image"
          :alt="translatedEvent?.title || event.title"
          class="h-72 w-full object-cover object-center sm:h-80 lg:h-96"
        >
      </div>

      <div class="px-6 py-6 md:px-8">
        <div class="space-y-4 text-base leading-7 text-slate-700">
          <p>{{ translatedEvent?.description || event.description }}</p>
          <p>
            {{ $t('eventDetail.placeholderCopy') }}
          </p>
          <p>
            {{ $t('eventDetail.extendCopy') }}
          </p>
        </div>

        <div class="mt-6 border-t border-slate-100 pt-6 text-sm text-slate-700">
          <p class="font-medium text-slate-900">{{ $t('eventDetail.factsTitle') }}</p>
          <p class="mt-1">{{ $t('eventDetail.categoryLabel') }}: {{ getCategoryTranslation(event.category) }}</p>
          <p class="mt-1">{{ $t('eventDetail.locationLabel') }}: {{ getLocationTranslation(event.location) }}</p>
          <p class="mt-1">{{ $t('eventDetail.dateLabel') }}: {{ new Date(event.date).toLocaleDateString('da-DK') }}</p>
        </div>

        <footer class="mt-8 grid grid-cols-12 gap-4 border-t border-slate-100 pt-6 lg:col-start-2 lg:col-end-12">
          <div class="col-span-12 flex items-center gap-3">
            <RouterLink to="/kontakt" class="inline-block bg-primary-darkest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-base">
              {{ $t('nav.contact') }}
            </RouterLink>
          </div>
        </footer>
      </div>
    </article>

    <p v-else class="mt-6 text-sm text-primary-darkest">{{ $t('eventDetail.notFound') }}</p>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { allEvents, getTranslatedEventItem } from '../data/events'

const route = useRoute()
const { locale, tm } = useI18n()

const event = computed(() => {
  const id = Number(route.params.id)
  return allEvents.find((item) => item.id === id) || null
})

const translatedEvent = computed(() => {
  if (!event.value) return null
  return getTranslatedEventItem(event.value, locale.value)
})

const getCategoryTranslation = (category) => {
  const categories = tm('eventCategoryLabels')
  return categories?.[category] || category
}

const getLocationTranslation = (location) => {
  const locations = tm('eventLocationLabels')
  return locations?.[location] || location
}
</script>