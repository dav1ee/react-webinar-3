import { BrowserRouter } from 'react-router-dom';

import { StoreContext } from '../store/context';

export default function Providers({ store, children }) {
  return (
    <StoreContext.Provider value={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </StoreContext.Provider>
  );
}
