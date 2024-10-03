import { memo } from 'react';
import PropTypes from 'prop-types';

function AuthControls({ labels, isAuth, onLogin, onLogout }) {
  return isAuth ? (
    <button onClick={onLogout}>{labels.onLogout}</button>
  ) : (
    <button onClick={onLogin}>{labels.onLogin}</button>
  );
}

AuthControls.propTypes = {
  labels: PropTypes.shape({
    onLogin: PropTypes.string,
    onLogout: PropTypes.string,
  }),
  isAuth: PropTypes.bool,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
};

export default memo(AuthControls);
