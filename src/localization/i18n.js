import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./EN/translation.json";
import heb from "./HEB/translation.json";
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    heb: {
      translation: heb,
    },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
