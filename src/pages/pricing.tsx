import { useTranslation } from 'react-i18next';

import Seo from '../layouts/seo/seo';
import { withLayout } from '../layouts/layout';
import { PricingPageComponent } from '../pageComponent';

const PricingPage = () => {
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
      <PricingPageComponent />
    </Seo>
  );
};

export default withLayout(PricingPage);
