import * as userActions from './user/user.action';
import * as instructorActions from './instructor/instructor.action';
import * as courseActions from './course/course.action';
import { userSliceAction } from './user/user.slice';
import { instructorSliceAction } from './instructor/instructor.slice';
import { courseSliceAction } from './course/course.slice';

export const allActions = {
  ...userSliceAction,
  ...userActions,
  ...instructorSliceAction,
  ...instructorActions,
  ...courseActions,
  ...courseSliceAction,
};
