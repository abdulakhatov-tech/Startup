import { GetServerSideProps, NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';

const InstructorPage: NextPage = () => {
  return <div>InstructorPage</div>;
};

export default withInstructorLayout(InstructorPage);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/instructor/students',
      permanent: false,
    },
  };
};
