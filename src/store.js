import { findItem, calculateTotal } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: {
        items: [],
        totalPrice: 0,
      },
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param item {Object}
   */
  addItemToCart(item) {
    const itemInCart = findItem(this.state.cart.items, 'code', item.code);

    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      const newItems = [...this.state.cart.items, { ...item, quantity: 1 }];

      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          items: newItems,
        },
      });
    }

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        totalPrice: calculateTotal(this.state.cart.items, 'price', 'quantity'),
      },
    });
  }

  /**
   * Удаление товара из корзины по коду
   * @param code {Number}
   */
  removeItemFromCart(code) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: this.state.cart.items.filter(item => item.code !== code),
        totalPrice: calculateTotal(this.state.cart.items, 'price', 'quantity'),
      },
    });
  }
}

export default Store;
