import { CourseType } from 'src/interfaces/course.interface';

export interface CourseInitialStateType {
  isLoading: boolean;
  error: string | null | unknown;
}

export interface CourseCreateBodyInterface extends CourseType {
  callback: () => void;
}

export interface DeleteBodyInterface {
  courseId: string;
  callback: () => void;
}
