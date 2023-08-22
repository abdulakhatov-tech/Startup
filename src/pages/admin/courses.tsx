import { withAdminLayout } from '@/src/layouts/admin';
import { AdminCoursesPageComponent } from '@/src/pageComponent';

const Courses = () => {
  return <AdminCoursesPageComponent />;
};

export default withAdminLayout(Courses);
