import { memo, useCallback, useEffect } from 'react';

import Item from '../../components/item';
import List from '../../components/list';

import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Main() {
  const store = useStore();
  const list = useSelector(state => state.catalog.list);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
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

  return <List list={list} renderItem={renders.item} />;
}

export default memo(Main);
