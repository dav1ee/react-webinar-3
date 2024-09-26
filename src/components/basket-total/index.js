import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { useLocalization } from '../../app/localization/use-localization';

import { numberFormat } from '../../utils';

import './style.css';

function BasketTotal({ sum = 0 }) {
  const cn = bem('BasketTotal');
  const { getLocale } = useLocalization();

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{getLocale('basketInfo', 'total')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
