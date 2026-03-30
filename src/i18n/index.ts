import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import az from "./locales/az.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

const STORAGE_KEY = "i18nextLng";
const supportedLanguages = ["az", "en", "ru"] as const;

const normalizeLanguage = (value?: string | null) => {
  const baseLanguage = value?.split("-")[0]?.toLowerCase();
  return supportedLanguages.includes(baseLanguage as (typeof supportedLanguages)[number]) ? baseLanguage : "az";
};

const initialLanguage = normalizeLanguage(localStorage.getItem(STORAGE_KEY));

if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, initialLanguage);
}

i18n
  .use(initReactI18next)
  .init({
    resources: { az: { translation: az }, en: { translation: en }, ru: { translation: ru } },
    fallbackLng: "az",
    lng: initialLanguage,
    supportedLngs: supportedLanguages,
    load: "languageOnly",
    interpolation: { escapeValue: false },
  });

document.documentElement.lang = initialLanguage;

i18n.on("languageChanged", (language) => {
  const normalizedLanguage = normalizeLanguage(language);
  localStorage.setItem(STORAGE_KEY, normalizedLanguage);
  document.documentElement.lang = normalizedLanguage;
});

export default i18n;
