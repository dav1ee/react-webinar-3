/**
 * @param value {String}
 * @param locale {String}
 * @param options {Object}
 * @returns {String}
 */
export default function dateFormat(
  value,
  locale = 'ru-RU',
  options = {
    minute: 'numeric',
    hour: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
) {
  const date = new Date(value);

  return new Intl.DateTimeFormat(locale, options).format(date);
}
