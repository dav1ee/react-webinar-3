import { useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import AuthBar from '../../containers/auth-bar';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LoginForm from '../../components/login-form';

import useAuth from '../../hooks/use-auth';
import useTranslate from '../../hooks/use-translate';

function Login() {
  const { isLoading, isSuccess, error, login } = useAuth();
  const { t } = useTranslate();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate('/profile');
  }, [isSuccess]);

  return (
    <PageLayout>
      <AuthBar />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        title={t('auth.login')}
        labels={{
          login: t('auth.login'),
          password: t('auth.password'),
          onSubmit: t('auth.onLogin'),
        }}
        onSubmit={login}
        isSubmitting={isLoading}
        error={error}
      />
    </PageLayout>
  );
}

export default memo(Login);
