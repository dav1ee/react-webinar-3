import { RouterProvider } from 'react-router-dom';

import { StoreContext } from '../store/context';

export default function Providers({ store, router }) {
  return (
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  );
}
