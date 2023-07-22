import { useTranslation } from 'react-i18next';

import Seo from '../layouts/seo/seo';
import { withLayout } from '../layouts/layout';
import { ContactPageComponent } from '../pageComponent';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={
        `${t('contact_page_title', { ns: 'seo' })}` ||
        'Education || Contact page'
      }
      metaDescription={
        `${t('contact_page_description', { ns: 'seo' })}` ||
        'Contact with Education platform'
      }
    >
      <ContactPageComponent />
    </Seo>
  );
};

export default withLayout(ContactPage);
