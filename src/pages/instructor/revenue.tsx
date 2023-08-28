import { GetServerSideProps, NextPage } from 'next';

import { withInstructorLayout } from '@/src/layouts/Instructor';
import { InstructorRevenuePageComponent } from '@/src/pageComponent';
import { PaymentService } from '@/src/services/payment.service';
import { BalanceType } from '@/src/interfaces/instructor.interface';

const Revenue: NextPage<RevenuePageType> = ({ balance }) => {
  return <InstructorRevenuePageComponent balance={balance} />;
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
