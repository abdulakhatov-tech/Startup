import { useTranslation } from 'react-i18next';

import Seo from '../layouts/seo/seo';
import { withLayout } from '../layouts/layout';
import { BooksPageComponent } from '../pageComponent';
import { GetServerSideProps } from 'next';
import { BooksService } from '../services/books.service';
import { BooksType } from '../interfaces/books.interface';

const Books = () => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={
        `${t('books_page_title', { ns: 'seo' })}` || 'Education || Books'
      }
      metaDescription={
        `${t('books_page_description', { ns: 'seo' })}` ||
        'More users in Education platform frequently asked questions'
      }
    >
      <BooksPageComponent />
    </Seo>
  );
};

export default withLayout(Books);

export const getServerSideProps: GetServerSideProps<
  BooksPageProps
> = async () => {
  const books = await BooksService.get();

  return {
    props: { books },
  };
};

interface BooksPageProps {
  books: BooksType[];
}
