import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';

import Seo from 'src/layouts/seo/seo';
import { withLayout } from 'src/layouts/layout';
import { AppService } from 'src/services/app.service';
import { CoursesPageComponent } from 'src/pageComponent';
import { CourseType } from 'src/interfaces/course.interface';

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

export const getServerSideProps: GetServerSideProps<MainPageProps> = async ({
  req,
}) => {
  const courses = await AppService.getCourses(req.cookies.i18next);

  return {
    props: { courses },
  };
};

interface MainPageProps {
  courses: CourseType[];
}
