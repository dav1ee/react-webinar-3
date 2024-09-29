import { createRoot } from 'react-dom/client';

import Providers from './app/providers';
import Store from './store';
import App from './app';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <Providers store={store}>
    <App />
  </Providers>,
);
