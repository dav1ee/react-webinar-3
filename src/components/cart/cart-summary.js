import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { formatNumber } from '../../utils';

import './style.css';

function CartSummary({ totalPrice = 0 }) {
  const cn = bem('Cart-summary');
  const price = formatNumber(totalPrice);

  return (
    <div className={cn()}>
      <span>Итого</span>
      <span>{price} ₽</span>
    </div>
  );
}

CartSummary.propTypes = {
  totalPrice: PropTypes.number,
};

export default CartSummary;
