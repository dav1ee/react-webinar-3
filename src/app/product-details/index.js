import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Article from '../../components/article';

import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function ProductDetails() {
  const store = useStore();
  const { id } = useParams();
  const product = useSelector(state => state.productDetails.item);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  useEffect(() => {
    store.actions.productDetails.load(id);
  }, [id]);

  if (!product) return;

  return <Article onAdd={callbacks.addToBasket} {...product} />;
}

export default memo(ProductDetails);
