import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { StudentPageComponent } from '@/src/pageComponent';

const Students: NextPage = () => {
  return <StudentPageComponent />;
};

export default withInstructorLayout(Students);
