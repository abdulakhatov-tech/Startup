import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';

const Revenue: NextPage = () => {
  return <div>Revenue</div>;
};

export default withInstructorLayout(Revenue);
