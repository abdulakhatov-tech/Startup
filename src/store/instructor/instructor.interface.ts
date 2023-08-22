import { InstructorType } from '@/src/interfaces/instructor.interface';
import { CourseType } from 'src/interfaces/course.interface';

export interface InstructorInitialStateType {
  isLoading: boolean;
  error: string | null | unknown;
  courses: CourseType[];
  course: CourseType | null;
  instructors: InstructorType[];
}

export interface InstructorApplyBody {
  firstName: string;
  lastName: string;
  email: string;
  socialMedia: string;
  callback: () => void;
}
