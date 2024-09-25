import { useCallback, useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, matchPath } from 'react-router-dom';

import Basket from './basket';

import PageLayout from '../components/page-layout';
import Head from '../components/head';
import BasketTool from '../components/basket-tool';

import useStore from '../store/use-store';
import useSelector from '../store/use-selector';

import { ROUTER_PATHS } from '../constants';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const location = useLocation();
  const store = useStore();

  const select = useSelector(state => ({
    productTitle: state.productDetails.item?.title,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeModal: state.modals.name,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const title =
    matchPath(ROUTER_PATHS.PRODUCT_DETAILS, location.pathname) && !!select.productTitle
      ? select.productTitle
      : 'Магазин';

  return (
    <>
      <PageLayout head={<Head title={title} />}>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        <Outlet />
      </PageLayout>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
