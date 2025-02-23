import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
      pl={{ base: '0px', md: '30px', lg: '320px' }}
      mt={10}
      w={'full'}
      borderTop={'1px'}
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTopColor={useColorModeValue('gray.200', 'gray.700')}
      h={{ base: '13vh', md: '10vh' }}
    >
      <Flex
        justify={{ base: 'space-around', md: 'space-between' }}
        align={'center'}
        direction={{ base: 'column', md: 'row' }}
        h={'full'}
      >
        <Text>
          © {format(new Date(), 'yyyy')} Education.{' '}
          {t('footer', { ns: 'layout' })}
        </Text>
        <Flex gap={3} mr={10}>
          <IconButton
            icon={<FaTelegram />}
            colorScheme={'facebook'}
            variant={'outline'}
            aria-label={'telegram'}
          />
          <IconButton
            icon={<FaInstagram />}
            colorScheme={'facebook'}
            variant={'outline'}
            aria-label={'instagram'}
          />
          <IconButton
            icon={<FaYoutube />}
            colorScheme={'facebook'}
            variant={'outline'}
            aria-label={'youtube'}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
