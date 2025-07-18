"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    dashboard: "Tableau de Bord",
    alerts: "Alertes",
    settings: "Paramètres",
    temperature: "Température",
    ph: "pH",
    oxygen: "Oxygène Dissous",
    salinity: "Salinité",
    turbidity: "Turbidité",
    optimal: "Optimal",
    warning: "Attention",
    critical: "Critique",
    lastUpdated: "Dernière mise à jour",
    details: "Détails",
    acknowledge: "Acquitter",
    export: "Exporter",
    filter: "Filtrer",
    today: "Aujourd'hui",
    week: "7 jours",
    month: "30 jours",
  },
  ar: {
    dashboard: "لوحة التحكم",
    alerts: "التنبيهات",
    settings: "الإعدادات",
    temperature: "درجة الحرارة",
    ph: "الحموضة",
    oxygen: "الأكسجين المذاب",
    salinity: "الملوحة",
    turbidity: "العكارة",
    optimal: "مثالي",
    warning: "تحذير",
    critical: "حرج",
    lastUpdated: "آخر تحديث",
    details: "التفاصيل",
    acknowledge: "تأكيد",
    export: "تصدير",
    filter: "تصفية",
    today: "اليوم",
    week: "7 أيام",
    month: "30 يوم",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    const saved = localStorage.getItem("aqua-language") as Language
    if (saved && (saved === "fr" || saved === "ar")) {
      setLanguage(saved)
      document.documentElement.lang = saved
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr"
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("aqua-language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
