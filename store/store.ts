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
  | 'nl'
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
  nl: 'Dutch',
  tr: 'Turkish',
  cs: 'Czech',
}

interface SubscriptionState {
  subscription: Subscription | null | undefined
  setSubscription: (subscription: Subscription | null) => void
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}))
