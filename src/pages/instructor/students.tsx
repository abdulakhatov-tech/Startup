import { GetServerSideProps, NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorStudentsPageComponent } from '@/src/pageComponent';
import { AuthService } from '@/src/services/auth.service';

const Students: NextPage = () => {
  return <InstructorStudentsPageComponent />;
};

export default withInstructorLayout(Students);

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
