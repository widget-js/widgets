import { createI18n } from 'vue-i18n'
import defaultEn from '@/i18n/default/en.json'
import defaultRu from '@/i18n/default/ru.json'
import defaultZh from '@/i18n/default/zh.json'
import settingsEn from '@/i18n/settings/en.json'
import settingsRu from '@/i18n/settings/ru.json'
import settingsZh from '@/i18n/settings/zh.json'
import trayEn from '@/i18n/tray/en.json'
import trayRu from '@/i18n/tray/ru.json'
import trayZh from '@/i18n/tray/zh.json'

export const i18n = createI18n({
  locale: 'zh',
  messages: {
    zh: {
      ...defaultZh,
      settings: settingsZh,
      tray: trayZh,
    },
    en: {
      ...defaultEn,
      settings: settingsEn,
      tray: trayEn,
    },
    ru: {
      ...defaultRu,
      settings: settingsRu,
      tray: trayRu,
    },
  },
  fallbackLocale: 'en',
})
