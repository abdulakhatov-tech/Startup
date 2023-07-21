import {
  Button,
  Flex,
  HStack,
  Heading,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const Verification = () => {
  const { t } = useTranslation();

  return (
    <Stack spacing={5}>
      <Heading
        color={useColorModeValue('gray.900', 'gray.200')}
        lineHeight={1.1}
        fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
      >
        {t('verification_title', { ns: 'global' })}
        <Text
          as={'span'}
          bgGradient={'linear(to-r, gray.400, facebook.400)'}
          bgClip={'text'}
        >
          !
        </Text>
      </Heading>
      <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
        {t('verification_description', { ns: 'global' })}{' '}
      </Text>
      <HStack justify={'center'}>
        <PinInput
          otp
          size={'lg'}
          colorScheme="facebook"
          focusBorderColor="facebook.500"
        >
          {new Array(6).fill(1).map((_, index) => (
            <PinInputField key={index} />
          ))}
        </PinInput>
      </HStack>
      <Button
        w={'full'}
        h={14}
        bgGradient={'linear(to-r, facebook.400, gray.400)'}
        color="white"
        _hover={{
          bgGradient: 'linear(to-r, facebook.500, gray.500)',
          boxShadow: 'xl',
        }}
        mt={3}
      >
        {' '}
        {t('register_btn', { ns: 'global' })}
      </Button>
    </Stack>
  );
};

export default Verification;
