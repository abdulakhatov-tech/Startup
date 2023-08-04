import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorRevenuePageComponent } from '@/src/pageComponent';

const Revenue: NextPage = () => {
  return <InstructorRevenuePageComponent />;
};

export default withInstructorLayout(Revenue);
