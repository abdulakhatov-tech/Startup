import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';

const InstructorPage: NextPage = () => {
  return <div>InstructorPage</div>;
};

export default withInstructorLayout(InstructorPage);
