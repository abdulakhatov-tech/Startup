import { useTranslation } from 'react-i18next';
import { GetServerSideProps } from 'next';

import Seo from '@/src/layouts/seo/seo';
import { withLayout } from '@/src/layouts/layout';
import { Articles } from '@/src/services/article.service';
import { ArticlePageComponent } from '@/src/pageComponent';
import { Language } from '@/src/interfaces/constants.interface';
import { ArticleType } from '@/src/interfaces/article.interface';

const ArticlePage = ({ articles }: ArticlesPageProps) => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={
        `${t('article_page_title', { ns: 'seo' })}` || 'Education || Articles'
      }
      metaDescription={
        `${t('article_page_description', { ns: 'seo' })}` ||
        'Education platform courses'
      }
    >
      <ArticlePageComponent articles={articles} />;
    </Seo>
  );
};

export default withLayout(ArticlePage);

export const getServerSideProps: GetServerSideProps<
  ArticlesPageProps
> = async ({ req }) => {
  const lng: Language = req.cookies.i18next as Language;

  const articles = await Articles.getArticles(lng);

  return {
    props: {
      articles,
    },
  };
};

interface ArticlesPageProps extends Record<string, unknown> {
  articles: ArticleType[];
}
