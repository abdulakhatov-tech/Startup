import { Alert, AlertIcon, AlertTitle, Icon } from '@chakra-ui/react';
import { ErrorAlertProps } from './error-alert.props';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const ErrorAlert = ({ title, clearHandler }: ErrorAlertProps) => {
  const { t } = useTranslation();

  return (
    <Alert status="error" pos={'relative'}>
      <AlertIcon />
      <AlertTitle>{t(title, { ns: 'global' })}</AlertTitle>
      <Icon
        onClick={clearHandler}
        pos="absolute"
        right={2}
        top={2}
        as={AiFillCloseCircle}
        cursor={'pointer'}
        width={5}
        height={5}
      />
    </Alert>
  );
};

export default ErrorAlert;
