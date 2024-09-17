import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Head({ title, action }) {
  const cn = bem('Head');
  return (
    <div className={cn()}>
      <h1>{title}</h1>
      {action}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  action: PropTypes.node,
};

export default React.memo(Head);
