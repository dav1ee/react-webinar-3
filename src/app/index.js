import { Routes, Route } from 'react-router-dom';

import Main from './main';
import Basket from './basket';
import ProductDetails from './product-details';

import useSelector from '../store/use-selector';

import { ROUTER_PATHS } from '../constants';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={ROUTER_PATHS.MAIN} element={<Main />} />
        <Route path={ROUTER_PATHS.PRODUCT_DETAILS} element={<ProductDetails />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
