import { memo, useCallback } from 'react';
import { Link, generatePath } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { ROUTER_PATHS } from '../../constants';
import { numberFormat } from '../../utils';

import './style.css';

function ItemBasket({ item, onRemove = () => {} }) {
  const cn = bem('ItemBasket');
  const path = generatePath(ROUTER_PATHS.PRODUCT_DETAILS, { id: item._id });

  const callbacks = {
    onRemove: e => onRemove(item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={path} className={cn('title__link')}>
          {item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
};

export default memo(ItemBasket);
