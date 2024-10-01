import StoreModule from '../module';

/**
 * Детальная информация о товаре для страницы товара
 */
class ArticleState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
      error: null,
    };
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async load(id) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true,
      error: null,
    });

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
      );
      const json = await response.json();

      // Товар загружен успешно
      this.setState(
        {
          data: json.result,
          waiting: false,
        },
        'Загружен товар из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      this.setState(
        {
          data: {},
          waiting: false,
          error: e,
        },
        'Ошибка при загрузке товара',
      );
    }
  }
}

export default ArticleState;
