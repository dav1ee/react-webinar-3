import React, { useCallback } from 'react';

import List from './components/list';
import Item from './components/item';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const modal = store.getState().modal;

  const callbacks = {
    onAddItemToCart: useCallback(
      item => {
        store.addItemToCart(item);
      },
      [store],
    ),
    onRemoveItemFromCart: useCallback(
      code => {
        store.removeItemFromCart(code);
      },
      [store],
    ),
    onSetModal: useCallback(
      isOpen => {
        store.setModal(isOpen);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        totalItems={cart.items.length}
        totalPrice={cart.totalPrice}
        onSetModal={callbacks.onSetModal}
      />
      <List emptyMessage="Список товаров пуст" isEmpty={!list.length}>
        {list.map(item => (
          <Item
            key={item.code}
            item={item}
            actionLabel="Добавить"
            onClick={callbacks.onAddItemToCart}
          />
        ))}
      </List>
      <Modal headTitle="Корзина" isOpen={modal.isOpen} onSetModal={callbacks.onSetModal}>
        <Cart cart={cart} onRemoveItemFromCart={callbacks.onRemoveItemFromCart} />
      </Modal>
    </PageLayout>
  );
}

export default App;
