import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorCoursesPageComponent } from '@/src/pageComponent';

const Courses: NextPage = () => {
  return <InstructorCoursesPageComponent />;
};

export default withInstructorLayout(Courses);
