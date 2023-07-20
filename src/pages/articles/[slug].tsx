import { GetServerSideProps } from 'next';

import { withLayout } from '@/src/layouts/layout';
import { Articles } from '@/src/services/article.service';
import { Language } from '@/src/interfaces/constants.interface';
import { ArticleDetailedComponent } from '@/src/pageComponent';
import { ArticleType } from '@/src/interfaces/article.interface';

const ArticleDetailPage = ({
  article,
}: ArticleDetailedPageProps): JSX.Element => {
  return <ArticleDetailedComponent article={article} />;
};

export default withLayout(ArticleDetailPage);

export const getServerSideProps: GetServerSideProps<
  ArticleDetailedPageProps
> = async ({ query, req }) => {
  const slug: string = query.slug as string;
  const lng: Language = req.cookies.i18next as Language;
  const article = await Articles.getDetailedArticle(slug);

  if (article.language == lng) {
    return {
      props: {
        article,
      },
    };
  }

  return {
    redirect: {
      destination: '/articles',
      permanent: false,
    },
  };
};

interface ArticleDetailedPageProps extends Record<string, unknown> {
  article: ArticleType;
}
