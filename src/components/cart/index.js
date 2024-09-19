import React from 'react';
import PropTypes from 'prop-types';

import CartSummary from './cart-summary';
import List from '../list';
import Item from '../item';

import './style.css';

function Cart({ cart, onRemoveItemFromCart }) {
  return (
    <>
      <List isTopBordered={true} emptyMessage="Корзина пустая" isEmpty={!cart.items.length}>
        {cart.items.map(item => (
          <Item
            key={item.code}
            item={item}
            extraField={<span style={{ marginLeft: '38px' }}>{item.quantity} шт</span>}
            actionLabel="Удалить"
            onClick={onRemoveItemFromCart}
          />
        ))}
      </List>
      {!!cart.items.length && <CartSummary totalPrice={cart.totalPrice} />}
    </>
  );
}

Cart.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.array,
    totalPrice: PropTypes.number,
  }).isRequired,
  onRemoveItemFromCart: PropTypes.func,
};

export default React.memo(Cart);
