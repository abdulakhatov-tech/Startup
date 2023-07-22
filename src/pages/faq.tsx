import { useTranslation } from 'react-i18next';

import Seo from '../layouts/seo/seo';
import { withLayout } from '../layouts/layout';
import { FaqPageComponent } from '../pageComponent';

const FaqPage = () => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={`${t('faq_page_title', { ns: 'seo' })}` || 'Education || FAQ'}
      metaDescription={
        `${t('faq_page_description', { ns: 'seo' })}` ||
        'More users in Education platform frequently asked questions'
      }
    >
      <FaqPageComponent />
    </Seo>
  );
};

export default withLayout(FaqPage);
