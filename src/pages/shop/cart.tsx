import { withLayout } from '@/src/layouts/layout';
import { CartPageComponent } from '@/src/pageComponent';
import { NextPage } from 'next';

const CartPage: NextPage = () => {
  return <CartPageComponent />;
};

export default withLayout(CartPage);
