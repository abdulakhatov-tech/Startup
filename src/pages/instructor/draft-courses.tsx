import { NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorDraftCoursesPageComponent } from '@/src/pageComponent';

const DraftCourses: NextPage = () => {
  return <InstructorDraftCoursesPageComponent />;
};

export default withInstructorLayout(DraftCourses);
