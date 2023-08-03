import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';

const CreateCourse: NextPage = () => {
  return <div>CreateCourse</div>;
};

export default withInstructorLayout(CreateCourse);
