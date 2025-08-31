"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

type Language = "en" | "hi" | "ur" | "ar";

const translations: Record<Language, Record<string, string>> = {
  en: {
    hero_headline: "Where Faith Meets Luxury",
    hero_subtext: "Explore a trusted marketplace of premium halal products — carefully curated and authentically verified for your peace of mind and values.",
    hero_cta: "Enter the Collection",
  },
  hi: {
    hero_headline: "आस्था विलासिता से मिलती है",
    hero_subtext: "प्रीमियम हलाल उत्पादों का एक विश्वसनीय बाज़ार खोजें - आपकी मन की शांति और मूल्यों के लिए सावधानीपूर्वक क्यूरेट और प्रमाणित रूप से सत्यापित।",
    hero_cta: "संग्रह में प्रवेश करें",
  },
  ur: {
    hero_headline: "جہاں ایمان عیش و عشرت سے ملتا ہے۔",
    hero_subtext: "پریمیم حلال مصنوعات کا ایک قابل اعتماد بازار دریافت کریں — آپ کے ذہنی سکون اور اقدار کے لیے احتیاط سے تیار اور مستند طور پر تصدیق شدہ۔",
    hero_cta: "مجموعہ میں داخل ہوں۔",
  },
  ar: {
    hero_headline: "حيث يلتقي الإيمان بالفخامة",
    hero_subtext: "استكشف سوقًا موثوقًا به للمنتجات الحلال المتميزة - المنسقة بعناية والمتحقق منها بشكل أصلي من أجل راحة بالك وقيمك.",
    hero_cta: "أدخل المجموعة",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLang = localStorage.getItem("jalal-language") as Language | null;
    if (storedLang && translations[storedLang]) {
      setLanguageState(storedLang);
    }
  }, []);

  useEffect(() => {
      if (isMounted) {
        document.documentElement.lang = language;
        document.documentElement.dir = (language === 'ar' || language === 'ur') ? 'rtl' : 'ltr';
      }
  }, [language, isMounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if(isMounted) {
        localStorage.setItem("jalal-language", lang);
    }
  };

  const t = useCallback((key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  }, [language]);


  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
