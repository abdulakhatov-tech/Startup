import { useTranslation } from 'react-i18next';

import Seo from '../layouts/seo/seo';
import { AuthPageComponent } from '../pageComponent';

const Auth = () => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={
        `${t('auth_page_title', { ns: 'seo' })}` || 'Education || Auth'
      }
      metaDescription={
        `${t('auth_page_description', { ns: 'seo' })}` ||
        'Login or Create your account for using Education platform'
      }
    >
      <AuthPageComponent />
    </Seo>
  );
};

export default Auth;
