import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { plural, formatNumber } from '../../utils';

function CartInfo({ totalItems = 0, totalPrice = 0 }) {
  const cn = bem('Cart-info');

  const pluralized = plural(totalItems, {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
  });
  const price = formatNumber(totalPrice);
  const cartInfo = `${totalItems} ${pluralized} / ${price} ₽`;

  return (
    <div className={cn()}>
      <span>В корзине:</span>
      <strong>{!!totalItems ? cartInfo : 'пусто'}</strong>
    </div>
  );
}

CartInfo.propTypes = {
  totalItems: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default CartInfo;
