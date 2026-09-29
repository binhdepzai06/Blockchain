import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  isVietnamese: boolean;
  isEnglish: boolean;
}

const LanguageContext =
  createContext<LanguageContextType | undefined>(
    undefined,
  );

const LANGUAGE_STORAGE_KEY = "cryptolab-language";

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>(() => {
      const saved =
        localStorage.getItem(
          LANGUAGE_STORAGE_KEY,
        );

      return saved === "en" ? "en" : "vi";
    });

  useEffect(() => {
    localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      language,
    );

    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  };

  const toggleLanguage = () => {
    setLanguageState((current) =>
      current === "vi" ? "en" : "vi",
    );
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      isVietnamese: language === "vi",
      isEnglish: language === "en",
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider",
    );
  }

  return context;
}