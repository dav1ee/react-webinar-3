import StoreModule from '../module';
import { getArticleById } from '../../api/articles';

class ProductDetails extends StoreModule {
  initState() {
    return {
      item: null,
    };
  }

  async load(id) {
    const { result } = await getArticleById(id);

    this.setState(
      {
        ...this.getState(),
        item: result,
      },
      'Загружен товар из АПИ',
    );
  }
}

export default ProductDetails;
