import { withLayout } from '@/src/layouts/layout';
import { CheckoutPageComponent } from '@/src/pageComponent';
import { NextPage } from 'next';

const CheckoutPage: NextPage = () => {
  return <CheckoutPageComponent />;
};

export default withLayout(CheckoutPage);
