import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function CommentForm({ variant, error, isDisabled, t, onSubmit, onCancel }) {
  const cn = bem('CommentForm');

  const [text, setText] = useState('');

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  }

  function renderTitle() {
    if (variant === 'new-comment') return t('comments.newComment');
    if (variant === 'reply') return t('comments.newReply');
  }

  return (
    <form onSubmit={handleSubmit} className={cn()}>
      <h3 className={cn('title')}>{renderTitle()}</h3>
      <textarea className={cn('field')} value={text} onChange={handleTextChange}></textarea>
      <div className={cn('controls')}>
        <button type="submit" disabled={isDisabled}>
          {t('comments.send')}
        </button>
        {variant !== 'new-comment' && (
          <button type="button" onClick={onCancel}>
            {t('comments.cancel')}
          </button>
        )}
      </div>
      {error && <p className={cn('error')}>{error}</p>}
    </form>
  );
}

CommentForm.propTypes = {
  variant: PropTypes.oneOf(['new-comment', 'reply']),
  error: PropTypes.string,
  isDisabled: PropTypes.bool,
  t: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default memo(CommentForm);
