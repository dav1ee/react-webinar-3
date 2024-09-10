const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Получение склонения существительного в зависимости от числа
 * @param number {Number} Число, для которого нужно получить склонение
 * @param one {String} Форма склонения для единственного числа
 * @param many {String} Форма склонения для множественного числа
 * @returns {String}
 */
export function getDeclension(number, one, many) {
  const units = Math.abs(number % 10);
  const tens = Math.abs(number % 100);

  let declension = one;

  if (2 <= units && units <= 4 && (tens < 10 || 20 <= tens)) {
    declension = many;
  }

  return `${number} ${declension}`;
}
