import { paginationConfig } from '../../config';
import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      totalItems: 0,
      limit: paginationConfig.limit,
      skip: paginationConfig.skip,
    };
  }

  /**
   * @param page {Number}
   */
  async load(page = 1) {
    const { limit } = this.getState();
    const skip = (page - 1) * limit;

    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalItems: json.result.count,
        skip,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
