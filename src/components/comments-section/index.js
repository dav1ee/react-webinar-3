import { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import CommentItem from '../comment-item';
import CommentForm from '../comment-form';
import CommentDenied from '../comment-denied';

import listToTree from '../../utils/list-to-tree';
import dateFormat from '../../utils/date-format';

import './style.css';

function CommentsSection({
  lang,
  comments,
  commentsCount,
  waitingComments,
  errors,
  currentUser,
  sessionExists,
  t,
  onAdd,
}) {
  const cn = bem('CommentsSection');

  const [replyToCommentId, setReplyToCommentId] = useState(null);

  function onReply(id) {
    setReplyToCommentId(id);
  }

  function onCancel() {
    setReplyToCommentId(null);
  }

  function onSubmit(text) {
    onAdd(replyToCommentId, text);
  }

  const commentsTree = useMemo(() => listToTree(comments), [comments]);

  const renderComments = (commentsList, level = 0) => {
    return commentsList.map(comment => {
      const hasChildren = comment.children && !!comment.children.length;

      return (
        <div
          key={comment._id}
          className={cn('item_wrapper')}
          style={{ marginLeft: level === 0 ? 0 : '30px' }}
        >
          <CommentItem
            author={comment.author?.profile?.name ?? currentUser.name}
            date={dateFormat(comment.dateCreate, lang)}
            text={comment.text}
            isCreatedByCurrentUser={comment.author?._id === currentUser.id}
            t={t}
            onReply={() => onReply(comment._id)}
          />

          {hasChildren && renderComments(comment.children, level + 1)}

          {replyToCommentId === comment._id && (
            <div style={{ marginLeft: hasChildren ? '30px' : 0 }}>
              {sessionExists ? (
                <CommentForm
                  variant="reply"
                  error={errors.add}
                  isDisabled={waitingComments}
                  t={t}
                  onSubmit={onSubmit}
                  onCancel={onCancel}
                />
              ) : (
                <CommentDenied variant="reply" loginPath="/login" t={t} onCancel={onCancel} />
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{`${t('comments.title')} (${commentsCount})`}</h2>

      {!errors.load ? (
        !!commentsTree.length && renderComments(commentsTree[0].children)
      ) : (
        <p className={cn('error')}>{errors.load}</p>
      )}

      {!replyToCommentId &&
        (sessionExists ? (
          <CommentForm
            variant="new-comment"
            error={errors.add}
            isDisabled={waitingComments}
            t={t}
            onSubmit={onSubmit}
          />
        ) : (
          <CommentDenied variant="new-comment" loginPath="/login" t={t} />
        ))}
    </div>
  );
}

CommentsSection.propTypes = {
  lang: PropTypes.string,
  comments: PropTypes.array,
  commentsCount: PropTypes.number,
  waitingComments: PropTypes.bool,
  errors: PropTypes.shape({
    load: PropTypes.string,
    add: PropTypes.string,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  sessionExists: PropTypes.bool,
  t: PropTypes.func,
  onAdd: PropTypes.func,
};

export default memo(CommentsSection);
