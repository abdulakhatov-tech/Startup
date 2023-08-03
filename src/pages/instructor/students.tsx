import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorStudentsPageComponent } from '@/src/pageComponent';

const Students: NextPage = () => {
  return <InstructorStudentsPageComponent />;
};

export default withInstructorLayout(Students);
