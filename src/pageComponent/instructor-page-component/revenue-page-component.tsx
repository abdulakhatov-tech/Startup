import SectionTitle from '@/src/components/section-title/section-title';
import { getBalanceObject } from '@/src/helpers/total-price.helper';
import { BalanceType } from '@/src/interfaces/instructor.interface';
import { PaymentService } from '@/src/services/payment.service';
import {
  Card,
  CardBody,
  Divider,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import {
  MdAccountBalance,
  MdOutlineAccountBalanceWallet,
} from 'react-icons/md';
import { SiFuturelearn } from 'react-icons/si';
import { StatisticsCard } from 'src/components';

const RevenuePageComponent = ({ balance }: { balance: BalanceType }) => {
  const { t } = useTranslation();

  const openAccountLinks = async () => {
    const data = await PaymentService.instructorAccountLink();
    window.open(data);
  };

  return (
    <>
      <SectionTitle
        title={
          t('revenue_title', { ns: 'instructor' }) ||
          "Hi Instructor, that's your revenue statistics"
        }
        subtitle=""
        style={{ textAlign: 'center', padding: '50px 0px' }}
      />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatisticsCard
          title={t('earn', { ns: 'instructor' }) || 'Earn'}
          stat={Number('5000').toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          icon={<AiOutlineDollarCircle size={'3em'} />}
        />
        <StatisticsCard
          title={t('payouts', { ns: 'instructor' }) || 'Payouts'}
          stat={getBalanceObject(balance).payouts.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          icon={<SiFuturelearn size={'3em'} />}
        />
        <StatisticsCard
          title={t('balance', { ns: 'instructor' }) || 'Balance'}
          stat={Number('500').toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          icon={<MdOutlineAccountBalanceWallet size={'3em'} />}
        />
      </SimpleGrid>
      <Card mt={{ base: 10, md: 20 }}>
        <CardBody>
          <HStack justify={'space-between'}>
            <Heading
              fontFamily={'mono'}
              letterSpacing={5}
              fontSize={{ base: '18px', md: '30px', lg: '35px' }}
            >
              {t('revenue_report', { ns: 'instructor' }) || 'Revenue report'}
            </Heading>
            <Icon
              as={MdAccountBalance}
              fontSize={{ base: 30, sm: 40, md: 50 }}
            />
          </HStack>
          <Text fontSize={{ base: '12px', sm: '16px', md: '20px' }}>
            {t('revenue_report_description', { ns: 'instructor' }) ||
              'You get paid directly from stripe yo your bank account every 48 hours'}
          </Text>
          <Divider my={5} />
          <HStack justify={'space-between'}>
            <Heading
              fontFamily={'mono'}
              letterSpacing={5}
              fontSize={{ base: '18px', md: '30px', lg: '35px' }}
            >
              {t('pending_balance', { ns: 'instructor' }) || 'Pending balance'}
            </Heading>
            <Text
              fontSize={{ base: '20px', md: '22px' }}
              color={'facebook.400'}
            >
              {getBalanceObject(balance).payouts.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Text>
          </HStack>
          <Text fontSize={{ base: '12px', sm: '16px', md: '20px' }}>
            {t('pending_balance_description', { ns: 'instructor' }) ||
              'For 48 hours'}
          </Text>
          <Divider my={5} />
          <HStack justify={'space-between'}>
            <Heading
              fontFamily={'mono'}
              letterSpacing={5}
              fontSize={{ base: '18px', md: '30px', lg: '35px' }}
            >
              {t('payouts', { ns: 'instructor' }) || 'Payouts'}
            </Heading>
            <Icon
              as={FiSettings}
              fontSize={{ base: 30, sm: 40, md: 50 }}
              color={'facebook.400'}
              cursor={'pointer'}
              onClick={openAccountLinks}
            />
          </HStack>
          <Text fontSize={{ base: '12px', sm: '16px', md: '20px' }}>
            {t('payouts_description', { ns: 'instructor' }) ||
              'Update your account details or view previous payouts'}
          </Text>
        </CardBody>
      </Card>
    </>
  );
};

export default RevenuePageComponent;
