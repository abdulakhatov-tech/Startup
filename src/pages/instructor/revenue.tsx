import { GetServerSideProps, NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorRevenuePageComponent } from '@/src/pageComponent';
import { AuthService } from '@/src/services/auth.service';

const Revenue: NextPage = () => {
  return <InstructorRevenuePageComponent />;
};

export default withInstructorLayout(Revenue);

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
