import { memo, useCallback } from 'react';
import { generatePath } from 'react-router-dom';

import List from '../../components/list';
import ItemBasket from '../../components/item-basket';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';

import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

import { getLocale } from '../../utils';
import { ROUTER_PATHS } from '../../constants';

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    language: state.localization.language,
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        const path = generatePath(ROUTER_PATHS.PRODUCT_DETAILS, { id: item._id });
        const texts = {
          amount: getLocale(select.language, 'product', 'amount'),
          onRemove: getLocale(select.language, 'buttons', 'delete'),
        };
        return (
          <ItemBasket
            item={item}
            path={path}
            texts={texts}
            onRemove={callbacks.removeFromBasket}
            onCloseModal={callbacks.closeModal}
          />
        );
      },
      [callbacks.removeFromBasket, select.language],
    ),
  };

  return (
    <ModalLayout
      language={select.language}
      title={getLocale(select.language, 'titles', 'basket')}
      onClose={callbacks.closeModal}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal label={getLocale(select.language, 'basketInfo', 'total')} sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
