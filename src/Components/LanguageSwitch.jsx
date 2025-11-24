import "../App.css";
import en from "../translations/en.json";
import ar from "../translations/ar.json";

const translations = {
  en,
  ar,
};

const LanguageSwitch = ({ setLanguage }) => {
  const handleLanguageChange = (language) => {
    localStorage.setItem("language", language);
    setLanguage(translations[language]);
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  };

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${
          localStorage.getItem("language") === "en" ? "active" : ""
        }`}
        onClick={() => handleLanguageChange("en")}
      >
        English
      </button>
      <button
        className={`lang-btn ${
          localStorage.getItem("language") === "ar" ? "active" : ""
        }`}
        onClick={() => handleLanguageChange("ar")}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageSwitch;
