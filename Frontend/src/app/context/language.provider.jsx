import { useState } from "react";
import { LanguageContext } from "./language.context";
import { TRANSLATIONS } from "@/shared/constants/translations";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = TRANSLATIONS[language];

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}