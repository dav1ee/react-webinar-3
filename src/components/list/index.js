import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Item from '../item';

import './style.css';

function List({
  list,
  isCartList = false,
  onAddItemToCart = () => {},
  onRemoveItemFromCart = () => {},
}) {
  const cn = bem('List');

  return (
    <div className={`${cn()} ${isCartList && list.length ? cn('cart') : ''}`}>
      {list.length ? (
        list.map(item => (
          <div key={item.code} className={cn('item')}>
            <Item
              item={item}
              isCartItem={isCartList}
              onAddItemToCart={onAddItemToCart}
              onRemoveItemFromCart={onRemoveItemFromCart}
            />
          </div>
        ))
      ) : (
        <div className={cn('empty')}>Список товаров пуст</div>
      )}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }).isRequired,
  ),
  isCartList: PropTypes.bool,
  onAddItemToCart: PropTypes.func,
  onRemoveItemFromCart: PropTypes.func,
};

export default React.memo(List);
