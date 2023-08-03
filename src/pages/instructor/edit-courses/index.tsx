import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';

const EditCourses: NextPage = () => {
  return <div>EditCourses</div>;
};

export default withInstructorLayout(EditCourses);
