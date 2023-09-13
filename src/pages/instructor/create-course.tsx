import { GetServerSideProps, NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorCreateCoursePageComponent } from '@/src/pageComponent';
import { AuthService } from '@/src/services/auth.service';
import Seo from '@/src/layouts/seo/seo';

const CreateCourse: NextPage = () => {
  return (
    <Seo metaTitle="Instructor Create Course">
      <InstructorCreateCoursePageComponent />;
    </Seo>
  );
};

export default withInstructorLayout(CreateCourse);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
    props: {},
  };
};
