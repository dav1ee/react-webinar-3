import { useState, useEffect } from 'react';

import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18nService = useServices().i18n;

  const [lang, setLang] = useState(i18nService.getState());

  useEffect(() => {
    const unsubscribe = i18nService.subscribe(newLang => {
      setLang(newLang);
    });

    return () => unsubscribe();
  }, [i18nService]);

  return {
    lang,
    setLang: i18nService.setLang,
    t: i18nService.t,
  };
}
