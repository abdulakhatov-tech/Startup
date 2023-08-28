import { useTranslation } from 'react-i18next';

import Seo from '../layouts/seo/seo';
import { withLayout } from '../layouts/layout';
import { PricingPageComponent } from '../pageComponent';
import { GetServerSideProps } from 'next';
import { PaymentService } from '../services/payment.service';
import { ProductsType } from 'src/interfaces/constants.interface';

const PricingPage = ({ products }) => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={
        `${t('pricing_page_title', { ns: 'seo' })}` || 'Education || Pricing'
      }
      metaDescription={
        `${t('pricing_page_description', { ns: 'seo' })}` ||
        'The best package for using and doing lessons on Education platform'
      }
    >
      <PricingPageComponent products={products} />
    </Seo>
  );
};

export default withLayout(PricingPage);

export const getServerSideProps: GetServerSideProps<
  PricingPageType
> = async () => {
  const products = await PaymentService.productList();

  return {
    props: { products },
  };
};

interface PricingPageType extends Record<string, unknown> {
  products: ProductsType[];
}
