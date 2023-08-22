import { adminReducer } from './admin/admin.slice';
import { courseReducer } from './course/course.slice';
import { instructorReducer } from './instructor/instructor.slice';
import { lessonReducer } from './lesson/lesson.slice';
import { sectionReducer } from './section/section.slice';
import { userReducer } from './user/user.slice';

export const reducer = {
  user: userReducer,
  instructor: instructorReducer,
  course: courseReducer,
  section: sectionReducer,
  lesson: lessonReducer,
  admin: adminReducer,
};
