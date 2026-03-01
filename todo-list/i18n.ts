// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./src/locales/en.json";
import translationES from "./src/locales/es.json";

// Configure i18next with resources, language, and interpolation settings
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    es: { translation: translationES },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
