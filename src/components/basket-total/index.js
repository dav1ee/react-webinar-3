import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { numberFormat } from '../../utils';

import './style.css';

function BasketTotal({ label, sum = 0 }) {
  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{label}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  label: PropTypes.string,
  sum: PropTypes.number,
};

export default memo(BasketTotal);
