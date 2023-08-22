import { withAdminLayout } from '@/src/layouts/admin';
import { AdminBooksPageComponent } from '@/src/pageComponent';

const Books = () => {
  return <AdminBooksPageComponent />;
};

export default withAdminLayout(Books);
