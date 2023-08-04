import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorEditCoursesPageComponent } from '@/src/pageComponent';

const EditCourses: NextPage = () => {
  return <InstructorEditCoursesPageComponent />;
};

export default withInstructorLayout(EditCourses);
