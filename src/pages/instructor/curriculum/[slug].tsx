import { CourseType } from '@/src/interfaces/course.interface';
import { withInstructorLayout } from '@/src/layouts/Instructor';
import Seo from '@/src/layouts/seo/seo';
import { CurriculumPageComponent } from '@/src/pageComponent';
import { InstructorService } from '@/src/services/instructor.service';
import { GetServerSideProps, NextPage } from 'next';

const CurriculumPage: NextPage = () => {
  return (
    <Seo metaTitle="Curriculum">
      <CurriculumPageComponent />
    </Seo>
  );
};

export default withInstructorLayout(CurriculumPage);

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({
  req,
  query,
}) => {
  const course = await InstructorService.getDetailedCourse(
    req.cookies.refresh,
    query.slug as string
  );

  return {
    props: { course },
  };
};

interface CoursesPageType extends Record<string, unknown> {
  course: CourseType;
}
