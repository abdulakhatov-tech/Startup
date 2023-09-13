import { NextPage, GetServerSideProps } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorCoursesPageComponent } from '@/src/pageComponent';
import { InstructorService } from '@/src/services/instructor.service';
import { CourseType } from '@/src/interfaces/course.interface';
import { AuthService } from '@/src/services/auth.service';
import Seo from '@/src/layouts/seo/seo';

const Courses: NextPage<CoursesPageType> = () => {
  return (
    <Seo metaTitle="Instructor Courses">
      <InstructorCoursesPageComponent />
    </Seo>
  );
};

export default withInstructorLayout(Courses);

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({
  req,
}) => {
  const courses = await InstructorService.getAllCourses(req.cookies.refresh);
  const instructor = await AuthService.checkInstructor(req.cookies.refresh);

  if (!instructor) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      courses,
    },
  };
};

interface CoursesPageType extends Record<string, unknown> {
  courses: CourseType[];
}
