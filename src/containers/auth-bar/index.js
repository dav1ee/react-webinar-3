import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import SideLayout from '../../components/side-layout';
import AuthControls from '../../components/auth-controls';
import ProfileLink from '../../components/profile-link';

import useAuth from '../../hooks/use-auth';
import useTranslate from '../../hooks/use-translate';

function AuthBar() {
  const navigate = useNavigate();
  const { user, isAuth, logout } = useAuth();
  const { t } = useTranslate();

  const callbacks = {
    onLogin: useCallback(() => navigate('/login'), []),
    onLogout: useCallback(() => {
      logout();
      navigate('/');
    }, [logout]),
  };

  let children = [];

  if (isAuth) {
    children.push(
      <ProfileLink key="profile-link" path="/profile">
        {user.profile.name}
      </ProfileLink>,
    );
  }

  children.push(
    <AuthControls
      key="auth-controls"
      labels={{
        onLogin: t('auth.login'),
        onLogout: t('auth.logout'),
      }}
      isAuth={isAuth}
      onLogin={callbacks.onLogin}
      onLogout={callbacks.onLogout}
    />,
  );

  return (
    <SideLayout side="end" padding="small" gap="medium" border="bottom">
      {children}
    </SideLayout>
  );
}

export default memo(AuthBar);
