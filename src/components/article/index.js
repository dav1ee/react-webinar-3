import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Article({ _id, description, madeIn, category, edition, price, texts, onAdd }) {
  const cn = bem('Article');

  return (
    <div className={cn()}>
      <p className={cn('item')}>{description}</p>
      <p className={cn('item')}>
        {texts.originCountry}:{' '}
        <strong>
          {madeIn.title} ({madeIn.code})
        </strong>
      </p>
      <p className={cn('item')}>
        {texts.category}: <strong>{category.title}</strong>
      </p>
      <p className={cn('item')}>
        {texts.edition}: <strong>{edition}</strong>
      </p>
      <p className={cn('item', { price: true })}>
        {texts.price}: {price} ₽
      </p>
      <button onClick={() => onAdd(_id)}>{texts.onAdd}</button>
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
  texts: PropTypes.shape({
    originCountry: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.string,
    price: PropTypes.string,
    onAdd: PropTypes.string,
  }),
  onAdd: PropTypes.func,
};

export default memo(Article);
