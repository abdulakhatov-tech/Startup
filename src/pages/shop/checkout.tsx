import Seo from '@/src/layouts/seo/seo';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { API_URL } from 'src/config/api.config';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { CardType } from 'src/interfaces/constants.interface';
import { withLayout } from 'src/layouts/layout';
import { CheckoutPageComponent } from 'src/pageComponent';

const CheckoutPage: NextPage<CheckoutPageProps> = ({ cards }) => {
  const { books, courses, product } = useTypedSelector((state) => state.cart);

  const checkCard = () => books.length || courses.length || product.id;

  return (
    <Seo metaTitle="Checkout">
      {checkCard() ? <CheckoutPageComponent cards={cards} /> : <>Empty cart</>}
    </Seo>
  );
};

export default withLayout(CheckoutPage);

export const getServerSideProps: GetServerSideProps<
  CheckoutPageProps
> = async ({ req }) => {
  if (!req.cookies.refresh) {
    return {
      redirect: {
        destination: '/auth',
        permanent: true,
      },
    };
  }

  const { data } = await axios.get(`${API_URL}/customer/saved-cards`, {
    headers: {
      Authorization: `Bearer ${req.cookies.refresh}`,
    },
  });

  return {
    props: {
      cards: data,
    },
  };
};

interface CheckoutPageProps extends Record<string, unknown> {
  cards: CardType[];
}
