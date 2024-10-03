import { useCallback } from 'react';

import useStore from './use-store';
import useSelector from './use-selector';

export default function useAuth() {
  const store = useStore();

  const select = useSelector(state => ({
    token: state.auth.token,
    user: state.auth.user,
    isLoading: state.auth.isLoading,
    isSuccess: state.auth.isSuccess,
    isInitialAuth: state.auth.isInitialAuth,
    isAuth: state.auth.isAuth,
    error: state.auth.error,
  }));

  const callbacks = {
    login: useCallback(data => store.actions.auth.login(data), [store]),
    logout: useCallback(() => store.actions.auth.logout(), [store]),
  };

  return {
    token: select.token,
    user: select.user,
    isLoading: select.isLoading,
    isSuccess: select.isSuccess,
    isInitialAuth: select.isInitialAuth,
    isAuth: select.isAuth,
    error: select.error,

    login: callbacks.login,
    logout: callbacks.logout,
  };
}
