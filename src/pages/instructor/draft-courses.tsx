import { GetServerSideProps, NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorDraftCoursesPageComponent } from '@/src/pageComponent';
import { InstructorService } from '@/src/services/instructor.service';
import { CourseType } from '@/src/interfaces/course.interface';
import { AuthService } from '@/src/services/auth.service';

const DraftCourses: NextPage = () => {
  return <InstructorDraftCoursesPageComponent />;
};

export default withInstructorLayout(DraftCourses);

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
