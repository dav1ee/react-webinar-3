/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * @param {Array} array
 * @param {String} idKey
 * @param {String} parentKey
 * @returns {Array}
 */
export function buildNestedTree(array, idKey = '_id', parentKey = 'parent') {
  const map = {};
  const roots = [];

  array.forEach(item => (map[item[idKey]] = { ...item, children: [] }));

  array.forEach(item => {
    const parentId = item[parentKey] ? item[parentKey][idKey] : null;

    if (parentId) {
      map[parentId].children.push(map[item[idKey]]);
    } else {
      roots.push(map[item[idKey]]);
    }
  });

  return roots;
}

/**
 * @param {Array} categories
 * @param {Number} level
 * @returns {Array}
 */
export function formatCategoriesWithDashes(categories, level = 0) {
  const result = [];

  categories.forEach(category => {
    const indent = '-'.repeat(level);
    result.push({
      title: !!indent ? `${indent} ${category.title}` : category.title,
      value: category._id,
    });

    if (category.children && category.children.length > 0) {
      result.push(...formatCategoriesWithDashes(category.children, level + 1));
    }
  });

  return result;
}
