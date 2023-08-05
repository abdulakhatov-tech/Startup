import { GetServerSideProps, NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorEditCoursesPageComponent } from '@/src/pageComponent';
import { InstructorService } from '@/src/services/instructor.service';
import { CourseType } from '@/src/interfaces/course.interface';

const EditCourses: NextPage = () => {
  return <InstructorEditCoursesPageComponent />;
};

export default withInstructorLayout(EditCourses);

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({
  req,
}) => {
  const courses = await InstructorService.getAllCourses(req.cookies.refresh);

  return {
    props: {
      courses,
    },
  };
};

interface CoursesPageType extends Record<string, unknown> {
  courses: CourseType[];
}
