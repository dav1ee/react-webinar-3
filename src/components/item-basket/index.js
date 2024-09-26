import { memo } from 'react';
import { Link, generatePath } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { useLocalization } from '../../app/localization/use-localization';

import { ROUTER_PATHS } from '../../constants';
import { numberFormat } from '../../utils';

import './style.css';

function ItemBasket({ item, onRemove = () => {}, onCloseModal = () => {} }) {
  const cn = bem('ItemBasket');
  const { getLocale } = useLocalization();
  const path = generatePath(ROUTER_PATHS.PRODUCT_DETAILS, { id: item._id });

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
          {numberFormat(item.amount || 0)} {getLocale('product', 'amount')}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{getLocale('buttons', 'delete')}</button>
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
  onCloseModal: PropTypes.func,
};

export default memo(ItemBasket);
