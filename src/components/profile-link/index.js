import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

export default function ProfileLink({ path, children }) {
  const cn = bem('ProfileLink');

  return (
    <Link to={path} className={cn()}>
      {children}
    </Link>
  );
}

ProfileLink.propTypes = {
  path: PropTypes.string,
  children: PropTypes.node,
};
