import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';

const Courses: NextPage = () => {
  return <div>Courses</div>;
};

export default withInstructorLayout(Courses);
