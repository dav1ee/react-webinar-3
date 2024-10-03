import { memo } from 'react';

import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import AuthBar from '../../containers/auth-bar';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import ProfileCard from '../../components/profile-card';
import Spinner from '../../components/spinner';

import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function Profile() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    user: state.user.user,
    isLoading: state.user.isLoading,
  }));

  useInit(() => {
    store.actions.user.load();
  }, []);

  return (
    <PageLayout>
      <AuthBar />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.isLoading}>
        <ProfileCard
          title={t('user.profile')}
          labels={{
            name: t('user.name'),
            phone: t('user.phone'),
          }}
          user={select.user}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
