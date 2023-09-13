import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { SiAwesomelists } from 'react-icons/si';
import { MdAlternateEmail, MdUpdate } from 'react-icons/md';

import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { StatsCardProps } from './dashboard.props';

const Account = () => {
  const { t } = useTranslation();
  const { user } = useTypedSelector((state) => state.user);

  return (
    <>
      <Box maxW="7xl" mx={'auto'}>
        <chakra.h1
          textAlign={'center'}
          fontSize={{ base: 'xl', md: '2xl', lg: '4xl' }}
          pb={6}
          fontWeight={'bold'}
        >
          {t('your_account_information', { ns: 'dashboard' })}
        </chakra.h1>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: 5, lg: 6 }}
        >
          <StatsCard
            title={t('date_of_registration', { ns: 'dashboard' })}
            stat={`${format(
              new Date(user?.createdAt as Date),
              'dd MMMM, yyyy'
            )}`}
            icon={<MdUpdate size={'2em'} />}
          />
          <StatsCard
            title={t('email', { ns: 'dashboard' })}
            stat={user?.email as string}
            icon={<MdAlternateEmail size={'2em'} />}
          />
          <StatsCard
            title={t('courses', { ns: 'dashboard' })}
            stat={`${user?.courses.length} ta`}
            icon={<SiAwesomelists size={'2em'} />}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Account;

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;

  return (
    <Stat
      px={2}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
      overflowX={'hidden'}
    >
      <Flex justifyContent={'space-between'}>
        <Box>
          <StatLabel fontSize={'md'} fontWeight={'medium'} isTruncated mb={1}>
            {title}
          </StatLabel>
          <StatNumber fontSize={'sm'} fontWeight={'bold'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
