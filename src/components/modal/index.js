import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Head from '../head';

import './style.css';

function Modal({ headTitle = '', isOpen = false, children, onSetModal = () => {} }) {
  const cn = bem('Modal');

  if (isOpen) {
    return (
      <div className={cn('backdrop')}>
        <div className={cn()}>
          <Head
            title={headTitle}
            action={<button onClick={() => onSetModal(false)}>Закрыть</button>}
          />
          <div className={cn('content')}>{children}</div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  headTitle: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  onSetModal: PropTypes.func,
};

export default React.memo(Modal);
