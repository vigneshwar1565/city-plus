import { useState, useEffect } from "react";
import en from "../translations/en.json";
import ar from "../translations/ar.json";

const LANG_KEY = "language";
const translations = {
  en,
  ar,
};

//Not used in this project
const useTranslation = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem(LANG_KEY) || "en"
  );

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
    localStorage.setItem(
      "translations",
      JSON.stringify(translations[language])
    );
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (language) => {
    setLanguage(language);
  };

  return { language, changeLanguage };
};

export default useTranslation;
