import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Article({ _id, description, madeIn, category, edition, price, onAdd }) {
  const cn = bem('Article');

  return (
    <div className={cn()}>
      <p className={cn('item')}>{description}</p>
      <p className={cn('item')}>
        Страна производитель:{' '}
        <strong>
          {madeIn.title} ({madeIn.code})
        </strong>
      </p>
      <p className={cn('item')}>
        Категория: <strong>{category.title}</strong>
      </p>
      <p className={cn('item')}>
        Год выпуска: <strong>{edition}</strong>
      </p>
      <p className={cn('item', { price: true })}>Цена: {price} ₽</p>
      <button onClick={() => onAdd(_id)}>Добавить</button>
    </div>
  );
}

Article.propTypes = {
  _id: PropTypes.string,
  description: PropTypes.string,
  madeIn: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  category: PropTypes.shape({
    title: PropTypes.string,
  }),
  edition: PropTypes.number,
  price: PropTypes.number,
  onAdd: PropTypes.func,
};

export default memo(Article);
