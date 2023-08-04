import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorCreateCoursePageComponent } from '@/src/pageComponent';

const CreateCourse: NextPage = () => {
  return <InstructorCreateCoursePageComponent />;
};

export default withInstructorLayout(CreateCourse);
