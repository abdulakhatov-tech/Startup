import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorEditDetailedCoursePageComponent } from '@/src/pageComponent';

const EditDetailedCourses: NextPage = () => {
  return <InstructorEditDetailedCoursePageComponent />;
};

export default withInstructorLayout(EditDetailedCourses);
