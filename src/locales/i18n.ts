import { createI18n } from 'vue-i18n'

import mg from './mg.json'
import en from './en.json'
import fr from './fr.json'

const i18n = createI18n({
  legacy: false,          // IMPORTANT pour Vue 3
  locale: 'en',           // langue par défaut
  fallbackLocale: 'fr',   // langue de secours
  messages: {
    mg,
    en,
    fr
  }
})

export {i18n}
