import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function ProfileCard({ title, labels, user }) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{title}</div>
      <div className={cn('about')}>
        <div>
          {labels.name}: <strong>{user.profile?.name}</strong>
        </div>
        <div>
          {labels.phone}: <strong>{user.profile?.phone}</strong>
        </div>
        <div>
          email: <strong>{user.email}</strong>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  title: PropTypes.string,
  labels: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
  }),
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
    email: PropTypes.string,
  }),
};

export default memo(ProfileCard);
