import locales from './locales.json';
import useSelector from '../../store/use-selector';

export function useLocalization() {
  const language = useSelector(state => state.localization.language);

  /**
   * @param category {String} - titles, links, buttons, basketInfo, product
   * @param key {String} - titles: main, basket; links: home; buttons: add, delete, goTo, close; basketInfo: inside, empty, total; product: originCountry, category, edition, price, amount;
   * @returns {string}
   */
  function getLocale(category, key) {
    return locales[language][category][key];
  }

  return { language, getLocale };
}
