import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { numberFormat } from '../../utils';

import './style.css';

function BasketTool({ sum = 0, amount = 0, texts, onOpen = () => {} }) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{texts.label}</span>
      <span className={cn('total')}>
        {amount ? `${amount} ${texts.amount} / ${numberFormat(sum)} ₽` : texts.empty}
      </span>
      <button onClick={onOpen}>{texts.onOpen}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  texts: PropTypes.shape({
    label: PropTypes.string,
    amount: PropTypes.string,
    empty: PropTypes.string,
    onOpen: PropTypes.string,
  }),
};

export default memo(BasketTool);
