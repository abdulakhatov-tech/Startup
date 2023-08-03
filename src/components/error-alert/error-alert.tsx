import { Alert, AlertIcon, AlertTitle, Icon } from '@chakra-ui/react';
import { ErrorAlertProps } from './error-alert.props';
import { AiFillCloseCircle } from 'react-icons/ai';

const ErrorAlert = ({ title, clearHandler }: ErrorAlertProps) => {
  return (
    <Alert status="error" pos={'relative'}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
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
