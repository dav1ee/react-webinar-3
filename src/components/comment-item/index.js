import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function CommentItem({ author, date, text, isCreatedByCurrentUser, t, onReply }) {
  const cn = bem('CommentItem');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <div className={cn('author', { current: isCreatedByCurrentUser })}>{author}</div>
        <div className={cn('date')}>{date}</div>
      </div>
      <div>
        <p className={cn('text')}>
          {isCreatedByCurrentUser ? `${t('comments.myReply')}. ${text}` : text}
        </p>
      </div>
      <div>
        <button className={cn('reply_btn')} onClick={onReply}>
          {t('comments.reply')}
        </button>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  isCreatedByCurrentUser: PropTypes.bool,
  t: PropTypes.func,
  onReply: PropTypes.func,
};

export default memo(CommentItem);
