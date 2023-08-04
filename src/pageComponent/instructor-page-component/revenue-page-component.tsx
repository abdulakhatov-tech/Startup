import SectionTitle from '@/src/components/section-title/section-title';
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
import { FaFunnelDollar } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { SiFuturelearn } from 'react-icons/si';
import { StatisticsCard } from 'src/components';

const RevenuePageComponent = () => {
  const { t } = useTranslation();

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
          stat={Number('1000').toLocaleString('en-US', {
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
      <Card mt={20}>
        <CardBody>
          <HStack justify={'space-between'}>
            <Heading
              fontFamily={'mono'}
              letterSpacing={5}
              fontSize={{ base: 25, md: 35, lg: 40 }}
            >
              {t('revenue_report', { ns: 'instructor' }) || 'Revenue report'}
            </Heading>
            <Icon
              as={FaFunnelDollar}
              fontSize={{ base: 30, md: 40, lg: 50 }}
              color={'facebook.400'}
            />
          </HStack>
          <Text fontSize={{ base: 16, md: 20 }}>
            {t('revenue_report_description', { ns: 'instructor' }) ||
              'You get paid directly from stripe yo your bank account every 48 hours'}
          </Text>
          <Divider my={5} />
          <HStack justify={'space-between'}>
            <Heading
              fontFamily={'mono'}
              letterSpacing={5}
              fontSize={{ base: 25, md: 35, lg: 40 }}
            >
              {t('pending_balance', { ns: 'instructor' }) || 'Pending balance'}
            </Heading>
            <Text
              fontSize={{ base: 25, md: 35, lg: 40 }}
              color={'facebook.400'}
            >
              {Number('500').toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Text>
          </HStack>
          <Text fontSize={{ base: 16, md: 20 }}>
            {t('pending_balance_description', { ns: 'instructor' }) ||
              'For 48 hours'}
          </Text>
          <Divider my={5} />
          <HStack justify={'space-between'}>
            <Heading
              fontFamily={'mono'}
              letterSpacing={5}
              fontSize={{ base: 25, md: 35, lg: 40 }}
            >
              {t('payouts', { ns: 'instructor' }) || 'Payouts'}
            </Heading>
            <Icon
              as={FiSettings}
              fontSize={{ base: 30, md: 40, lg: 50 }}
              color={'facebook.400'}
            />
          </HStack>
          <Text fontSize={{ base: 16, md: 20 }}>
            {t('payouts_description', { ns: 'instructor' }) ||
              'Update your account details or view previous payouts'}
          </Text>
        </CardBody>
      </Card>
    </>
  );
};

export default RevenuePageComponent;
