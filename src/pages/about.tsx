import { useTranslation } from 'react-i18next';

import Seo from '../layouts/seo/seo';
import { withLayout } from '../layouts/layout';
import { AboutPageComponent } from '../pageComponent';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={
        `${t('about_page_title', { ns: 'seo' })}` || 'Education || About us'
      }
      metaDescription={
        `${t('about_page_description', { ns: 'seo' })}` ||
        'About Education platform courses'
      }
    >
      <AboutPageComponent />
    </Seo>
  );
};

export default withLayout(AboutPage);
