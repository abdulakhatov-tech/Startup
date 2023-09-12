import { withLayout } from '@/src/layouts/layout';
import Seo from '@/src/layouts/seo/seo';
import { CartPageComponent } from '@/src/pageComponent';
import { NextPage } from 'next';

const CartPage: NextPage = () => {
  return (
    <Seo metaTitle="Shopping Cart">
      <CartPageComponent />
    </Seo>
  );
};

export default withLayout(CartPage);
