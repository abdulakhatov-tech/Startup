import { CourseType } from '@/src/interfaces/course.interface';
import { withLayout } from '@/src/layouts/layout';
import Seo from '@/src/layouts/seo/seo';
import { DetailedCourseComponent } from '@/src/pageComponent';
import { AppService } from '@/src/services/app.service';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

const DetailedCoursePage = () => {
  const router = useRouter();

  return (
    <Seo
      metaTitle={`Education || ${router.query.slug}`}
      metaDescription={`${router.query.slug} course in Education platform`}
    >
      <DetailedCourseComponent />
    </Seo>
  );
};

export default withLayout(DetailedCoursePage);

export const getServerSideProps: GetServerSideProps<MainPageProps> = async ({
  query,
}) => {
  const course = await AppService.getDetailedCourse(query.slug as string);

  return {
    props: { course },
  };
};

interface MainPageProps {
  course: CourseType;
}
