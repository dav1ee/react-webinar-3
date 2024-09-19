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
      modal: {
        isOpen: false,
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
    const newItems = itemInCart
      ? this.state.cart.items.map(cartItem =>
          cartItem.code === item.code ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      : [...this.state.cart.items, { ...item, quantity: 1 }];

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: newItems,
        totalPrice: calculateTotal(newItems, 'price', 'quantity'),
      },
    });
  }

  /**
   * Удаление товара из корзины
   * @param item {Object}
   */
  removeItemFromCart(item) {
    const newItems = this.state.cart.items.filter(({ code }) => code !== item.code);

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: newItems,
        totalPrice: calculateTotal(newItems, 'price', 'quantity'),
      },
    });
  }

  /**
   * @param isOpen {Boolean}
   */
  setModal(isOpen) {
    this.setState({
      ...this.state,
      modal: { isOpen },
    });
  }
}

export default Store;
