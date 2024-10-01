import StoreModule from '../module';

import { buildNestedTree, formatCategoriesWithDashes } from '../../utils';

/**
 * Состояние категорий
 */
class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      waiting: false,
      error: null,
    };
  }

  async load() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const json = await response.json();

      const categoriesTree = buildNestedTree(json.result.items);
      const items = formatCategoriesWithDashes(categoriesTree);

      this.setState(
        {
          items: [{ title: 'Все', value: '' }, ...items],
          waiting: false,
          error: null,
        },
        'Загружен список категорий из АПИ',
      );
    } catch (e) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          error: e,
        },
        'Ошибка при загрузке категорий',
      );
    }
  }
}

export default CategoriesState;
