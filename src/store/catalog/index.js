import StoreModule from '../module';

import { config } from '../../api/config';
import { getArticles } from '../../api/articles';

import { codeGenerator } from '../../utils';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      totalItems: 0,
      limit: config.pagination.limit,
      skip: config.pagination.skip,
    };
  }

  /**
   * @param page {Number}
   */
  async load(page = 1) {
    const { limit } = this.getState();
    const skip = (page - 1) * limit;

    const { result } = await getArticles(limit, skip);

    this.setState(
      {
        ...this.getState(),
        list: result.items,
        totalItems: result.count,
        skip,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
