import { memo } from 'react';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';

function ProductDetails() {
  return (
    <PageLayout>
      <Head title="Название товара" />
      <BasketTool />
    </PageLayout>
  );
}

export default memo(ProductDetails);
