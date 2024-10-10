import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function CommentDenied({ variant, loginPath, t, onCancel }) {
  const cn = bem('CommentDenied');
  const location = useLocation();

  function renderText() {
    if (variant === 'new-comment') return t('comments.denyNewComment');
    if (variant === 'reply') return `${t('comments.denyReply')}.`;
  }

  return (
    <div className={cn()}>
      <div>
        <Link to={loginPath} state={{ back: location.pathname }} className={cn('link')}>
          {t('comments.signIn')}
        </Link>
        , {renderText()}
      </div>
      {variant !== 'new-comment' && (
        <button onClick={onCancel} className={cn('cancel_btn')}>
          {t('comments.cancel')}
        </button>
      )}
    </div>
  );
}

CommentDenied.propTypes = {
  variant: PropTypes.oneOf(['new-comment', 'reply']),
  loginPath: PropTypes.string,
  t: PropTypes.func,
  onCancel: PropTypes.func,
};

export default memo(CommentDenied);
