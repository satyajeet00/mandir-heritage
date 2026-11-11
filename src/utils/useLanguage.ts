import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Language = "mr" | "en";

const KEY = "lang";
const EVENT = "lang-change";

function read(): Language {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    const saved = fromUrl ?? window.localStorage.getItem(KEY);
    if (saved === "en" || saved === "mr") return saved;
  } catch {
    /* storage unavailable: fall through to default */
  }
  return "mr";
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Language state persisted in localStorage, overridable with ?lang=en|mr. SSR renders "mr". */
export function useLanguage(): [Language, (lang: Language) => void] {
  const lang = useSyncExternalStore(subscribe, read, () => "mr" as Language);

  const setLang = useCallback((next: Language) => {
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return [lang, setLang];
}
