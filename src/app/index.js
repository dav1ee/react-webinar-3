import { Routes, Route } from 'react-router-dom';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import useAuth from '../hooks/use-auth';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import ProtectedRoute from './protected-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const { isAuth } = useAuth();
  const activeModal = useSelector(state => state.modals.name);

  useInit(() => {
    store.actions.auth.authenticate();
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route
          path={'/profile'}
          element={<ProtectedRoute isAllowed={isAuth} redirectPath={'/login'} />}
        >
          <Route element={<Profile />} index />
        </Route>
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
