import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Menu from '../../components/menu';
import BasketTool from '../../components/basket-tool';
import Select from '../../components/select';
import Article from '../../components/article';

import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

import { getLocale, plural } from '../../utils';
import { ROUTER_PATHS, LANGUAGES } from '../../constants';

function ProductDetails() {
  const store = useStore();
  const { id } = useParams();
  const product = useSelector(state => state.productDetails.item);

  const select = useSelector(state => ({
    language: state.localization.language,
    productTitle: state.productDetails.item?.title,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onSetLanguage: useCallback(lang => store.actions.localization.setLanguage(lang), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  useEffect(() => {
    store.actions.productDetails.load(id);
  }, [id]);

  if (!product) return;

  return (
    <PageLayout
      head={
        <Head
          title={select.productTitle}
          actions={
            <Select
              value={select.language}
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
      <Menu
        links={[{ path: ROUTER_PATHS.MAIN, label: getLocale(select.language, 'links', 'home') }]}
      >
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          texts={{
            label: getLocale(select.language, 'basketInfo', 'inside'),
            amount: plural(
              select.amount,
              select.language === LANGUAGES.RUSSIAN
                ? {
                    one: 'товар',
                    few: 'товара',
                    many: 'товаров',
                  }
                : select.language === LANGUAGES.ENGLISH
                  ? {
                      one: 'item',
                      other: 'items',
                    }
                  : {},
              select.language,
            ),
            empty: getLocale(select.language, 'basketInfo', 'empty'),
            onOpen: getLocale(select.language, 'buttons', 'goTo'),
          }}
        />
      </Menu>
      <Article
        texts={{
          originCountry: getLocale(select.language, 'product', 'originCountry'),
          category: getLocale(select.language, 'product', 'category'),
          edition: getLocale(select.language, 'product', 'edition'),
          price: getLocale(select.language, 'product', 'price'),
          onAdd: getLocale(select.language, 'buttons', 'add'),
        }}
        onAdd={callbacks.addToBasket}
        {...product}
      />
      ;
    </PageLayout>
  );
}

export default memo(ProductDetails);
