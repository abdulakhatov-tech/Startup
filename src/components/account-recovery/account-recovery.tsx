import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  PinInput,
  PinInputField,
  Progress,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { AccountRecoveryProps } from './account-recovery.props';
import { useTranslation } from 'react-i18next';
import { useShowPassword } from '@/src/hooks/useShowPassword';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const AccountRecovery = ({
  onNavigateStateComponent,
}: AccountRecoveryProps): JSX.Element => {
  const { t } = useTranslation();
  const { show, toggleShow, showConfirm, toggleShowConfirm } =
    useShowPassword();
  const toast = useToast();

  //   state
  const [progress, setProgress] = useState<33.33 | 66.66 | 100>(33.33);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  //   onForm1Submit
  const onForm1Submit = () => {
    setStep(2);
    setProgress(66.66);
  };

  //   onForm2Submit
  const onForm2Submit = () => {
    setStep(3);
    setProgress(100);
  };

  //   onForm3Submit
  const onForm3Submit = () => {
    onNavigateStateComponent('login');
    toast({
      title: t('successfully_edited', { ns: 'global' }),
      description: t('successfully_edited_description', { ns: 'global' }),
      status: 'success',
      duration: 6000,
      isClosable: true,
      position: 'top-right',
    });
  };

  //   form1 UI
  const form1 = (
    <>
      <Heading
        color={useColorModeValue('gray.900', 'gray.200')}
        lineHeight={1.1}
        fontSize={{ base: '2xl', sm: '3xl' }}
      >
        {t('account_recovery_title_form1', { ns: 'global' })}{' '}
        <Text
          as={'span'}
          bgGradient={'linear(to-r, gray.400, facebook.400)'}
          bgClip={'text'}
        >
          !
        </Text>
      </Heading>
      <Text>{t('account_recovery_description_form1', { ns: 'global' })}</Text>
      <FormControl isRequired>
        <FormLabel>{t('contact_email', { ns: 'global' })}</FormLabel>
        <Input
          type="email"
          placeholder="education@gmail.com"
          focusBorderColor="facebook.500"
          h={14}
        />
      </FormControl>
      <Button
        w="full"
        h={14}
        bgGradient={'linear(to-r, facebook.400, gray.400)'}
        color="white"
        _hover={{
          bgGradient: 'linear(to-r, facebook.500, gray.500)',
          boxShadow: 'xl',
        }}
        onClick={onForm1Submit}
      >
        {t('account_recovery_btn_form1', { ns: 'global' })}
      </Button>
    </>
  );

  //   form2 UI
  const form2 = (
    <>
      <Heading
        color={useColorModeValue('gray.900', 'gray.200')}
        lineHeight={1.1}
        fontSize={{ base: '2xl', sm: '3xl' }}
      >
        {t('account_recovery_title_form2', { ns: 'global' })}{' '}
        <Text
          as={'span'}
          bgGradient={'linear(to-r, gray.400, facebook.400)'}
          bgClip={'text'}
        >
          !
        </Text>
      </Heading>
      <Text>{t('account_recovery_description_form2', { ns: 'global' })}</Text>
      <HStack justify={'center'} my={3}>
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
        w="full"
        h={14}
        bgGradient={'linear(to-r, facebook.400, gray.400)'}
        color="white"
        _hover={{
          bgGradient: 'linear(to-r, facebook.500, gray.500)',
          boxShadow: 'xl',
        }}
        onClick={onForm2Submit}
      >
        {t('account_recovery_btn_form2', { ns: 'global' })}
      </Button>
    </>
  );

  //   form3 UI
  const form3 = (
    <>
      <Heading
        color={useColorModeValue('gray.900', 'gray.200')}
        lineHeight={1.1}
        fontSize={{ base: '2xl', sm: '3xl' }}
      >
        {t('account_recovery_title_form3', { ns: 'global' })}{' '}
        <Text
          as={'span'}
          bgGradient={'linear(to-r, gray.400, facebook.400)'}
          bgClip={'text'}
        >
          !
        </Text>
      </Heading>
      <Text>{t('account_recovery_description_form3', { ns: 'global' })}</Text>
      <FormControl isRequired>
        <FormLabel>
          {t('login_input_password_label', { ns: 'global' })}
        </FormLabel>
        <InputGroup>
          <Input
            focusBorderColor="facebook.500"
            type={!show ? 'password' : 'text'}
            placeholder={'****'}
            h={14}
          />
          <InputRightElement pt={4}>
            <Icon
              as={!show ? AiOutlineEye : AiOutlineEyeInvisible}
              cursor={'pointer'}
              onClick={toggleShow}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>
          {t('register_input_confirm_password_label', { ns: 'global' })}
        </FormLabel>
        <InputGroup>
          <Input
            focusBorderColor="facebook.500"
            type={!showConfirm ? 'password' : 'text'}
            placeholder={'****'}
            h={14}
          />
          <InputRightElement pt={4}>
            <Icon
              as={!showConfirm ? AiOutlineEye : AiOutlineEyeInvisible}
              cursor={'pointer'}
              onClick={toggleShowConfirm}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        w="full"
        h={14}
        bgGradient={'linear(to-r, facebook.400, gray.400)'}
        color="white"
        _hover={{
          bgGradient: 'linear(to-r, facebook.500, gray.500)',
          boxShadow: 'xl',
        }}
        onClick={onForm3Submit}
      >
        {t('account_recovery_btn_form3', { ns: 'global' })}
      </Button>
    </>
  );

  //   rendering
  return (
    <>
      <Progress value={progress} colorScheme="facebook" hasStripe isAnimated />

      <Stack spacing={4}>
        {step === 1 && form1}
        {step === 2 && form2}
        {step === 3 && form3}
      </Stack>
    </>
  );
};

export default AccountRecovery;
