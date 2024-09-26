import StoreModule from '../module';

import { LANGUAGES, LOCAL_STORAGE } from '../../constants';

class Localization extends StoreModule {
  initState() {
    const language = localStorage.getItem(LOCAL_STORAGE.LANGUAGE) ?? LANGUAGES.RUSSIAN;
    return { language };
  }

  setLanguage(language) {
    this.setState({ language }, `Установлен язык: ${language}`);
    localStorage.setItem(LOCAL_STORAGE.LANGUAGE, language);
  }
}

export default Localization;
