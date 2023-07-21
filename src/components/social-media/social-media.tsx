import { Box, Button, Center, HStack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const SocialMedia = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        pos={'relative'}
        _before={{
          content: '""',
          position: 'absolute',
          width: '45%',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          height: '1px',
          bg: 'gray.600',
        }}
        _after={{
          content: '""',
          position: 'absolute',
          width: '45%',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          height: '1px',
          bg: 'gray.600',
        }}
        textAlign={'center'}
      >
        OR
      </Box>
      <HStack flexWrap={{ base: 'wrap', '2xl': 'nowrap' }}>
        <Button w={'full'} colorScheme={'gray'} leftIcon={<FaGithub />}>
          <Center>
            <Text>{t('continue_with_github', { ns: 'global' })}</Text>
          </Center>
        </Button>

        <Button
          w={'full'}
          colorScheme={'red'}
          variant={'outline'}
          leftIcon={<FaGoogle />}
        >
          <Center>
            <Text>{t('sign_in_with_google', { ns: 'global' })}</Text>
          </Center>
        </Button>
      </HStack>
    </>
  );
};

export default SocialMedia;
