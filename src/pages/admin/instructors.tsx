import { withAdminLayout } from '@/src/layouts/admin';
import { AdminInstructorsPageComponent } from '@/src/pageComponent';

const Instructors = () => {
  return <AdminInstructorsPageComponent />;
};

export default withAdminLayout(Instructors);
