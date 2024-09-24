import { createBrowserRouter } from 'react-router-dom';

import App from './';
import Main from './main';
import ProductDetails from './product-details';

import { ROUTER_PATHS } from '../constants';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTER_PATHS.MAIN,
        element: <Main />,
      },
      {
        path: ROUTER_PATHS.PRODUCT_DETAILS,
        element: <ProductDetails />,
      },
    ],
  },
]);

export default router;
