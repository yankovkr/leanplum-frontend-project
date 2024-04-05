import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// Import translations
import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    // fallbackLng: 'en',
    keySeparator: false, // Allow for nested translations without using dots
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
