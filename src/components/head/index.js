import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, actions }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {actions}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  actions: PropTypes.node,
};

export default memo(Head);
