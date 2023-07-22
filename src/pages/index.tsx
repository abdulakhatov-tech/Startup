import Seo from '../layouts/seo/seo';
import { withLayout } from '../layouts/layout';
import { HomePageComponent } from '../pageComponent';

const Home = () => {
  return (
    <Seo>
      <HomePageComponent />
    </Seo>
  );
};

export default withLayout(Home);
