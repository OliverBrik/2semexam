import { createI18n } from 'vue-i18n'
import da from './da.json'
import de from './de.json'
import en from './en.json'


// Falder altid tilbage på dansk hvis en oversættelse mangler
const i18n = createI18n({
  legacy: false,
  locale: 'da',
  fallbackLocale: 'da',
  messages: {
    da,
    de,
    en
  }
})

export default i18n
