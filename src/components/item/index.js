import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { formatNumber } from '../../utils';

import './style.css';

function Item({ item, extraField = null, actionLabel = '', onClick = () => {} }) {
  const cn = bem('Item');
  const price = formatNumber(item.price);

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('actions')}>
        <span>{price} ₽</span>
        {extraField}
        <button onClick={() => onClick(item)}>{actionLabel}</button>
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
  extraField: PropTypes.node,
  actionLabel: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Item);
