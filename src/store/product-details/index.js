import StoreModule from '../module';

class ProductDetails extends StoreModule {
  initState() {
    return {
      item: null,
    };
  }

  async load(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        item: json.result,
      },
      'Загружен товар из АПИ',
    );
  }
}

export default ProductDetails;
