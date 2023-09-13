import { GetServerSideProps, NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorRevenuePageComponent } from '@/src/pageComponent';
import { PaymentService } from '@/src/services/payment.service';
import { BalanceType } from '@/src/interfaces/instructor.interface';
import Seo from '@/src/layouts/seo/seo';

const Revenue: NextPage<RevenuePageType> = ({ balance }) => {
  return (
    <Seo metaTitle="Instructor Revenue">
      <InstructorRevenuePageComponent balance={balance} />;
    </Seo>
  );
};

export default withInstructorLayout(Revenue);

export const getServerSideProps: GetServerSideProps<RevenuePageType> = async ({
  req,
}) => {
  const balance = await PaymentService.getInstructorBalance(
    req.cookies.refresh
  );

  return {
    props: {
      balance,
    },
  };
};

interface RevenuePageType {
  balance: BalanceType;
}
