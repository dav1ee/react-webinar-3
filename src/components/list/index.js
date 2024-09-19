import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function List({ isTopBordered = false, emptyMessage = '', isEmpty = false, children }) {
  const cn = bem('List');

  if (isEmpty) {
    return <div className={cn('empty')}>{emptyMessage}</div>;
  }

  return <div className={cn({ 'with-border': isTopBordered })}>{children}</div>;
}

List.propTypes = {
  isTopBordered: PropTypes.bool,
  emptyMessage: PropTypes.string,
  isEmpty: PropTypes.bool,
  children: PropTypes.node,
};

export default React.memo(List);
