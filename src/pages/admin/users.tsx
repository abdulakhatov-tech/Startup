import { withAdminLayout } from '@/src/layouts/admin';
import { AdminUsersPageComponent } from '@/src/pageComponent';

const Users = () => {
  return <AdminUsersPageComponent />;
};

export default withAdminLayout(Users);
