import { memo, useCallback, useEffect } from 'react';

import Item from '../../components/item';
import List from '../../components/list';
import Pagination from '../../components/pagination';

import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Main() {
  const store = useStore();
  const select = useSelector(state => ({
    list: state.catalog.list,
    totalItems: state.catalog.totalItems,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onPaginate: useCallback(page => store.actions.catalog.load(page), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  return (
    <>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalItems={select.totalItems}
        limit={select.limit}
        skip={select.skip}
        onPaginate={callbacks.onPaginate}
      />
    </>
  );
}

export default memo(Main);
