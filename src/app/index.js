import { useCallback, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Outlet />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
