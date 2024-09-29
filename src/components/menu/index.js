import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Menu({ links, children }) {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
      <nav className={cn('nav')}>
        {links.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}

Menu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  children: PropTypes.node,
};

export default memo(Menu);
