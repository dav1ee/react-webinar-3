import { createRoot } from 'react-dom/client';

import Store from './store';
import Providers from './app/providers';
import router from './app/router';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(<Providers store={store} router={router} />);
