<script setup>
import BusinessLogo from '../assets/logos/Business logo.svg'
import InterregLogo from '../assets/logos/interreg logo white.svg'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const contactEmail = 'lecba@toender.dk'
</script>

<template>
  <!-- Footer sektion -->
  <footer class="w-full bg-primary-darkest text-neutral-light">
    <div class="grid grid-cols-12 gap-4 px-8 py-12">
      <!-- Logoer og juridisk info -->
      <div class="col-span-12 md:col-start-2 md:col-end-5 flex flex-col items-start gap-2 p-0">
        <img :src="BusinessLogo" alt="Business Region Logo" class="h-12 w-auto p-0 m-0" loading="lazy" decoding="async" />
        <img :src="InterregLogo" alt="Interreg Logo" class="h-12 w-auto p-0 m-0" loading="lazy" decoding="async" />
        <div class="mt-4 pt-3 border-t border-neutral-light/20">
          <RouterLink to="/juridiske-oplysninger" class="text-xs text-neutral-light/70 hover:text-neutral-light hover:underline">
            {{ t('footer.legalInfo') }}
          </RouterLink>
        </div>
      </div>

      <!-- Kontaktinfo -->
      <div class="col-span-12 md:col-start-6 md:col-end-9 flex flex-col gap-3 justify-start">
        <p class="text-sm font-light mt-0">{{ t('footer.address') }}</p>
        <p class="text-sm font-light">{{ t('footer.phone') }}</p>
        <p class="text-sm font-light">Email: <a :href="`mailto:${contactEmail}`" class="hover:underline">{{ contactEmail }}</a></p>
        <p class="text-sm font-light">{{ t('footer.openingHours') }}</p>
        <div class="mt-3 ">
          <p class="text-xs text-neutral-light/60">{{ t('footer.copyright') }}</p>
        </div>
      </div>

      <!-- Kontakt knap og sociale ikoner -->
      <div class="col-span-12 md:col-start-9 md:col-end-12 flex flex-col items-center md:items-end gap-3">
        <RouterLink
          to="/kontakt"
          class="w-full md:w-36 bg-neutral-light text-primary-darkest font-light hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 flex items-center justify-center py-2 text-center"
        >
          {{ t('footer.contactButton') }}
        </RouterLink>
        <div class="flex gap-3">
          <!-- Facebook -->
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 bg-neutral-light text-primary-darkest hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 shrink-0">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <!-- YouTube -->
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 bg-neutral-light text-primary-darkest hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 shrink-0">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <!-- LinkedIn -->
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 bg-neutral-light text-primary-darkest hover:bg-primary-light hover:text-neutral-light transition-colors duration-300 shrink-0">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.047-8.821 0-9.74h3.554v1.378c.43-.664 1.195-1.61 2.905-1.61 2.123 0 3.714 1.388 3.714 4.373v5.599zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.77-1.715 1.959-1.715 1.188 0 1.916.76 1.944 1.715 0 .953-.756 1.715-1.988 1.715zm1.581 11.597H3.714V9.505h3.204v10.947zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
