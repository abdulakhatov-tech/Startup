import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';

const DraftCourses: NextPage = () => {
  return <div>DraftCourses</div>;
};

export default withInstructorLayout(DraftCourses);
