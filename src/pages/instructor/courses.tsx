import { NextPage, GetServerSideProps } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorCoursesPageComponent } from '@/src/pageComponent';
import { InstructorService } from '@/src/services/instructor.service';
import { CourseType } from '@/src/interfaces/course.interface';

const Courses: NextPage<CoursesPageType> = () => {
  return <InstructorCoursesPageComponent />;
};

export default withInstructorLayout(Courses);

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
