import { NextPage } from 'next';
import { withLayout } from 'src/layouts/layout';
import { UserDashboardPageComponent } from 'src/pageComponent';

const Dashboard: NextPage = () => {
  return <UserDashboardPageComponent />;
};

export default withLayout(Dashboard);
