import { create } from 'zustand'
import { Subscription } from '@/types/subscription'

export type LanguagesSupported =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'ja'
  | 'ko'
  | 'pt'
  | 'ru'
  | 'zh'
  | 'sk'
  | 'pl'
  | 'tr'
  | 'cs'

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  pt: 'Portuguese',
  ru: 'Russian',
  zh: 'Chinese',
  sk: 'Slovak',
  pl: 'Polish',
  tr: 'Turkish',
  cs: 'Czech',
}

const LANGUAGES_IN_FREE = 2

interface LanguageState {
  language: LanguagesSupported
  setLanguage: (language: LanguagesSupported) => void
  getLanguages: (isPro: boolean) => LanguagesSupported[]
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[]
}

export const useLanguagesStore = create<LanguageState>()((set, get) => ({
  language: 'en',

  setLanguage: (language: LanguagesSupported) => set({ language }),

  getLanguages: (isPro: boolean) => {
    // If the user is pro, return all supported languages
    if (isPro) {
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[]
    }

    // If not pro, return only the first two languages
    return Object.keys(LanguagesSupportedMap).slice(
      0,
      LANGUAGES_IN_FREE
    ) as LanguagesSupported[]
  },

  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return [] // No unsupported languages for "pro" users

    return Object.keys(LanguagesSupportedMap).slice(
      LANGUAGES_IN_FREE
    ) as LanguagesSupported[]
    // Excluding the first two supported languages
  },
}))

interface SubscriptionState {
  subscription: Subscription | null | undefined
  setSubscription: (subscription: Subscription | null) => void
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}))
