import { createI18n } from 'vue-i18n'

const i18nMock = createI18n({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'en',
  warnHtmlInMessage: 'off',
  fallbackWarn: false,
  missingWarn: false,
  globalInjection: true
})

export default i18nMock
