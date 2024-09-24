import { memo, useState } from 'react';
import { Link, generatePath } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { ROUTER_PATHS } from '../../constants';
import { numberFormat } from '../../utils';

import './style.css';

function Item(props) {
  const cn = bem('Item');
  const path = generatePath(ROUTER_PATHS.PRODUCT_DETAILS, { id: props.item._id });

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={path} className={cn('title__link')}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
