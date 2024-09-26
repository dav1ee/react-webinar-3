import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import { useLocalization } from '../../app/localization/use-localization';

import { ROUTER_PATHS, LANGUAGES } from '../../constants';
import { numberFormat, plural } from '../../utils';

import './style.css';

function BasketTool({ sum = 0, amount = 0, onOpen = () => {} }) {
  const cn = bem('BasketTool');
  const { language, getLocale } = useLocalization();

  return (
    <div className={cn()}>
      <div className={cn('link')}>
        <Link to={ROUTER_PATHS.MAIN}>{getLocale('links', 'home')}</Link>
      </div>
      <span className={cn('label')}>{getLocale('basketInfo', 'inside')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(
              amount,
              language === LANGUAGES.RUSSIAN
                ? {
                    one: 'товар',
                    few: 'товара',
                    many: 'товаров',
                  }
                : language === LANGUAGES.ENGLISH
                  ? {
                      one: 'item',
                      other: 'items',
                    }
                  : {},
              language,
            )} / ${numberFormat(sum)} ₽`
          : getLocale('basketInfo', 'empty')}
      </span>
      <button onClick={onOpen}>{getLocale('buttons', 'goTo')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
