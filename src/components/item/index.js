import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { formatNumber } from '../../utils';

import './style.css';

function Item({
  item,
  isCartItem = false,
  onAddItemToCart = () => {},
  onRemoveItemFromCart = () => {},
}) {
  const cn = bem('Item');

  const price = formatNumber(item.price);

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('actions')}>
        <span className={isCartItem ? cn('actions-price') : ''}>{price} ₽</span>
        {isCartItem ? (
          <>
            <span>{item.quantity} шт</span>
            <button onClick={() => onRemoveItemFromCart(item.code)}>Удалить</button>
          </>
        ) : (
          <button onClick={() => onAddItemToCart(item)}>Добавить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  isCartItem: PropTypes.bool,
  onAddItemToCart: PropTypes.func,
  onRemoveItemFromCart: PropTypes.func,
};

export default React.memo(Item);
