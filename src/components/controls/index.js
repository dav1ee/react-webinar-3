import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { formatNumber } from '../../utils';

import './style.css';

function Controls({ totalItems, totalPrice }) {
  const cn = bem('Controls');

  const price = formatNumber(totalPrice);

  return (
    <div className={cn()}>
      <div className={cn('cart-info')}>
        <span>В корзине:</span>
        <strong>{!!totalItems ? `${totalItems} / ${price} ₽` : 'пусто'}</strong>
      </div>
      <button>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  totalItems: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default React.memo(Controls);
