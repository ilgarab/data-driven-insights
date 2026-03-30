import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import az from "./locales/az.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

const savedLng = localStorage.getItem("i18nextLng");

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { az: { translation: az }, en: { translation: en }, ru: { translation: ru } },
    fallbackLng: "az",
    lng: savedLng || "az",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

export default i18n;
