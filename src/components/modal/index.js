import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Head from '../head';
import List from '../list';
import { formatNumber } from '../../utils';

import './style.css';

function Modal({ modal, cart, onCloseModal = () => {}, onRemoveItemFromCart = () => {} }) {
  const cn = bem('Modal');

  const price = formatNumber(cart.totalPrice);

  if (modal.isOpen) {
    return (
      <div className={cn('backdrop')}>
        <div className={cn()}>
          <Head title="Корзина" action={<button onClick={onCloseModal}>Закрыть</button>} />

          <div className={cn('content')}>
            <List list={cart.items} isCartList={true} onRemoveItemFromCart={onRemoveItemFromCart} />
          </div>
          <div className={cn('footer')}>
            {!!cart.items.length && (
              <>
                <span>Итого</span>
                <span>{price} ₽</span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.array,
    totalPrice: PropTypes.number,
  }).isRequired,
  onCloseModal: PropTypes.func,
  onRemoveItemFromCart: PropTypes.func,
};

export default React.memo(Modal);
