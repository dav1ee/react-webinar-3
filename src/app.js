import React, { useCallback } from 'react';

import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';

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
    onOpenModal: useCallback(() => {
      store.openModal();
    }, [store]),
    onCloseModal: useCallback(() => {
      store.closeModal();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        totalItems={cart.items.length}
        totalPrice={cart.totalPrice}
        onOpenModal={callbacks.onOpenModal}
      />
      <List list={list} onAddItemToCart={callbacks.onAddItemToCart} />
      <Modal
        modal={modal}
        cart={cart}
        onCloseModal={callbacks.onCloseModal}
        onRemoveItemFromCart={callbacks.onRemoveItemFromCart}
      />
    </PageLayout>
  );
}

export default App;
