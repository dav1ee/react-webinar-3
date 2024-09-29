import { memo, useCallback, useEffect } from 'react';
import { generatePath } from 'react-router-dom';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Menu from '../../components/menu';
import Select from '../../components/select';
import BasketTool from '../../components/basket-tool';
import Item from '../../components/item';
import List from '../../components/list';
import Pagination from '../../components/pagination';

import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

import { getLocale, plural } from '../../utils';
import { ROUTER_PATHS, LANGUAGES } from '../../constants';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    language: state.localization.language,
    list: state.catalog.list,
    totalItems: state.catalog.totalItems,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onPaginate: useCallback(page => store.actions.catalog.load(page), [store]),
    onSetLanguage: useCallback(lang => store.actions.localization.setLanguage(lang), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        const path = generatePath(ROUTER_PATHS.PRODUCT_DETAILS, { id: item._id });
        const texts = {
          onAdd: getLocale(select.language, 'buttons', 'add'),
        };
        return <Item item={item} path={path} texts={texts} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket, select.language],
    ),
  };

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  return (
    <PageLayout
      head={
        <Head
          title={getLocale(select.language, 'titles', 'main')}
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
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalItems={select.totalItems}
        limit={select.limit}
        skip={select.skip}
        onPaginate={callbacks.onPaginate}
      />
    </PageLayout>
  );
}

export default memo(Main);
