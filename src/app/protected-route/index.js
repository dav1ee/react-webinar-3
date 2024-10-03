import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ isAllowed, redirectPath }) {
  return isAllowed ? <Outlet /> : <Navigate to={redirectPath} replace />;
}

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool,
  redirectPath: PropTypes.string,
};
