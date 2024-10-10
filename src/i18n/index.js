import translate from './translate';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = this.config.lang;
    this.listeners = [];
  }

  subscribe = listener => {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  };

  getState = () => {
    return this.lang;
  };

  setLang = lang => {
    this.lang = lang;
    this.listeners.forEach(listener => listener(this.getState()));
    this.updateHeaders(lang);
  };

  t = (text, plural) => {
    return translate(this.lang, text, plural);
  };

  updateHeaders = lang => {
    const apiService = this.services.api;
    apiService.setHeader('Accept-Language', lang);
  };
}

export default I18nService;
