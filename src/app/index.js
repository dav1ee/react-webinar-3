import { useCallback } from 'react';
import { Outlet, useLocation, matchPath } from 'react-router-dom';

import Basket from './basket';
import { useLocalization } from './localization/use-localization';

import PageLayout from '../components/page-layout';
import Head from '../components/head';
import BasketTool from '../components/basket-tool';
import Select from '../components/select';

import useStore from '../store/use-store';
import useSelector from '../store/use-selector';

import { ROUTER_PATHS, LANGUAGES } from '../constants';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const location = useLocation();
  const store = useStore();

  const { language, getLocale } = useLocalization();

  const select = useSelector(state => ({
    productTitle: state.productDetails.item?.title,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeModal: state.modals.name,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onSetLanguage: useCallback(lang => store.actions.localization.setLanguage(lang), [store]),
  };

  const title =
    matchPath(ROUTER_PATHS.PRODUCT_DETAILS, location.pathname) && !!select.productTitle
      ? select.productTitle
      : getLocale('titles', 'main');

  return (
    <>
      <PageLayout
        head={
          <Head
            title={title}
            actions={
              <Select
                value={language}
                options={[
                  { value: LANGUAGES.RUSSIAN, label: 'Русский' },
                  { value: LANGUAGES.ENGLISH, label: 'English' },
                ]}
                onChange={callbacks.onSetLanguage}
              />
            }
          />
        }
      >
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        <Outlet />
      </PageLayout>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
