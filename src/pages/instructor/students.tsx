import { GetServerSideProps, NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorStudentsPageComponent } from '@/src/pageComponent';
import { AuthService } from '@/src/services/auth.service';
import Seo from '@/src/layouts/seo/seo';

const Students: NextPage = () => {
  return (
    <Seo metaTitle="Instructor Students">
      <InstructorStudentsPageComponent />
    </Seo>
  );
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
