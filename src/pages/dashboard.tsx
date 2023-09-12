import { NextPage } from 'next';
import { withLayout } from 'src/layouts/layout';
import { UserDashboardPageComponent } from 'src/pageComponent';
import Seo from '../layouts/seo/seo';

const Dashboard: NextPage = () => {
  return (
    <Seo metaTitle="Dashboard">
      <UserDashboardPageComponent />
    </Seo>
  );
};

export default withLayout(Dashboard);
