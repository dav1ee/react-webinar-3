import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import CartInfo from '../cart/cart-info';

import './style.css';

function Controls({ totalItems, totalPrice, onSetModal = () => {} }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <CartInfo totalItems={totalItems} totalPrice={totalPrice} />
      <button onClick={() => onSetModal(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  totalItems: PropTypes.number,
  totalPrice: PropTypes.number,
  onSetModal: PropTypes.func,
};

export default React.memo(Controls);
