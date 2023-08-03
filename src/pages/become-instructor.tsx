import React from 'react';
import { withLayout } from '../layouts/layout';
import { BecomeInstructorPageComponent } from '../pageComponent';
import { NextPage } from 'next';
import Seo from '../layouts/seo/seo';
import { useTranslation } from 'react-i18next';

const BecomeInstructor: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={
        `${t('become_instructor_today', { ns: 'instructor' })}` ||
        'Education || Become an instructor'
      }
      metaDescription={`${t('become_instructor_today_descritpion', {
        ns: 'instructor',
      })}`}
    >
      <BecomeInstructorPageComponent />
    </Seo>
  );
};

export default withLayout(BecomeInstructor);
