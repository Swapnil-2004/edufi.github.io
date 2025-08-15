import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('edufi-language') as Language;
    if (saved && ['en', 'hi', 'bn'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('edufi-language', lang);
  };

  const t = (key: string) => {
    // Import translations dynamically
    const translations: Record<Language, Record<string, string>> = {
      en: {
        'nav.home': 'Home',
        'nav.features': 'Features',
        'nav.eduswipe': 'EduSwipe',
        'nav.scholarships': 'Scholarships',
        'nav.login': 'Login',
        'hero.title': 'From classroom to career – let AI guide you',
        'hero.subtitle': 'Your personalized AI mentor for academic success, budget-friendly planning, and career growth. Discover scholarships, find teammates, and build your future.',
        'hero.cta1': 'Start My Journey',
        'hero.cta2': 'Explore Features',
        'features.title': 'Powerful Features for Your Success',
        'features.subtitle': 'AI-powered tools designed specifically for Indian students to excel academically and financially',
      },
      hi: {
        'nav.home': 'होम',
        'nav.features': 'विशेषताएं',
        'nav.eduswipe': 'एडुस्वाइप',
        'nav.scholarships': 'छात्रवृत्ति',
        'nav.login': 'लॉगिन',
        'hero.title': 'कक्षा से करियर तक – AI आपका मार्गदर्शन करे',
        'hero.subtitle': 'शैक्षणिक सफलता, बजट-अनुकूल योजना और करियर विकास के लिए आपका व्यक्तिगत AI गुरु। छात्रवृत्ति खोजें, टीममेट्स ढूंढें और अपना भविष्य बनाएं।',
        'hero.cta1': 'मेरी यात्रा शुरू करें',
        'hero.cta2': 'विशेषताएं देखें',
        'features.title': 'आपकी सफलता के लिए शक्तिशाली सुविधाएं',
        'features.subtitle': 'भारतीय छात्रों के लिए विशेष रूप से डिज़ाइन किए गए AI-संचालित उपकरण',
      },
      bn: {
        'nav.home': 'হোম',
        'nav.features': 'বৈশিষ্ট্য',
        'nav.eduswipe': 'এডুস্বাইপ',
        'nav.scholarships': 'বৃত্তি',
        'nav.login': 'লগইন',
        'hero.title': 'শ্রেণীকক্ষ থেকে ক্যারিয়ার – AI আপনাকে গাইড করুক',
        'hero.subtitle': 'একাডেমিক সাফল্য, বাজেট-বান্ধব পরিকল্পনা এবং ক্যারিয়ার বৃদ্ধির জন্য আপনার ব্যক্তিগত AI গুরু। বৃত্তি আবিষ্কার করুন, টিমমেট খুঁজুন এবং আপনার ভবিষ্যত গড়ুন।',
        'hero.cta1': 'আমার যাত্রা শুরু করুন',
        'hero.cta2': 'বৈশিষ্ট্য দেখুন',
        'features.title': 'আপনার সাফল্যের জন্য শক্তিশালী বৈশিষ্ট্য',
        'features.subtitle': 'ভারতীয় ছাত্রদের জন্য বিশেষভাবে ডিজাইন করা AI-চালিত সরঞ্জাম',
      }
    };

    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
