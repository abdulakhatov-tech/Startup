import { useTranslation } from 'react-i18next';

import Seo from '../layouts/seo/seo';
import { withLayout } from '../layouts/layout';
import { BooksPageComponent } from '../pageComponent';

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
