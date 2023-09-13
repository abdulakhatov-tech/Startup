import { GetServerSideProps, NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorEditDetailedCoursePageComponent } from '@/src/pageComponent';
import { InstructorService } from '@/src/services/instructor.service';
import { CourseType } from '@/src/interfaces/course.interface';
import Seo from '@/src/layouts/seo/seo';

const EditDetailedCourses: NextPage = () => {
  return (
    <Seo metaTitle="Edit Detailed Course">
      <InstructorEditDetailedCoursePageComponent />
    </Seo>
  );
};

export default withInstructorLayout(EditDetailedCourses);

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
