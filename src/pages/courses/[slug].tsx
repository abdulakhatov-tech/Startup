import { withLayout } from '@/src/layouts/layout';
import Seo from '@/src/layouts/seo/seo';
import { DetailedCourseComponent } from '@/src/pageComponent';
import { useRouter } from 'next/router';

const DetailedCoursePage = () => {
  const router = useRouter();

  return (
    <Seo
      metaTitle={`Education || ${router.query.slug}`}
      metaDescription={`${router.query.slug} course in Education platform`}
    >
      <DetailedCourseComponent />
    </Seo>
  );
};

export default withLayout(DetailedCoursePage);
