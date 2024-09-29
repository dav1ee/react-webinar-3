import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { numberFormat } from '../../utils';

import './style.css';

function ItemBasket({ item, path, texts, onRemove = () => {}, onCloseModal = () => {} }) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => onRemove(item._id),
    onCloseModal: e => onCloseModal(),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={path} onClick={callbacks.onCloseModal} className={cn('title__link')}>
          {item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(item.amount || 0)} {texts.amount}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{texts.onRemove}</button>
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
  path: PropTypes.string,
  texts: PropTypes.shape({
    amount: PropTypes.string,
    onRemove: PropTypes.string,
  }),
  onRemove: PropTypes.func,
  onCloseModal: PropTypes.func,
};

export default memo(ItemBasket);
