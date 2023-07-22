import { useTranslation } from 'react-i18next';

import Seo from '@/src/layouts/seo/seo';
import { withLayout } from '../../layouts/layout';
import { CoursesPageComponent } from '../../pageComponent';

const Courses = () => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={
        `${t('course_page_title', { ns: 'seo' })}` || 'Education || All Courses'
      }
      metaDescription={
        `${t('course_page_description', { ns: 'seo' })}` ||
        'Education platform courses'
      }
    >
      <CoursesPageComponent />
    </Seo>
  );
};

export default withLayout(Courses);
