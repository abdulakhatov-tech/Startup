import { format } from 'date-fns';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, HStack, Stack, Text } from '@chakra-ui/react';

import { TransactionsProps } from './dashboard.props';

const Transactions: FC<TransactionsProps> = ({ transactions }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <HStack justify={'space-between'}>
        <Text fontSize={'xl'} fontWeight={'bold'}>
          {t('information', { ns: 'dashboard' })}
        </Text>
        <Text fontSize={'xl'} fontWeight={'bold'}>
          {t('transactions', { ns: 'dashboard' })}
        </Text>
      </HStack>
      <Divider my={5} />
      {transactions.map((transaction) => (
        <Fragment key={transaction.id}>
          <HStack justify={'space-between'} align={'flex-start'}>
            <Stack>
              <Text
                fontWeight={'bold'}
                color={'facebook.300'}
                fontSize={'xl'}
                textTransform={'capitalize'}
              >
                {transaction.payment_method_details.card.brand} -{' '}
                {'**** **** **** '}
                {transaction.payment_method_details.card.last4}
              </Text>
              <Text>
                {format(new Date(transaction.created * 1000), 'dd MMMM, yyyy')}
              </Text>
            </Stack>
            <Text fontSize={'2xl'} fontWeight={'bold'}>
              {(transaction.amount / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Text>
          </HStack>
          <Divider my={5} />
        </Fragment>
      ))}
    </>
  );
};

export default Transactions;
