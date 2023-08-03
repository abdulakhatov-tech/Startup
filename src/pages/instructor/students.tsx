import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';

const Students: NextPage = () => {
  return <div>Students</div>;
};

export default withInstructorLayout(Students);
