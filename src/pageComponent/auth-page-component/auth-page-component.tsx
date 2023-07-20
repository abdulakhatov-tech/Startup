import {
  Avatar,
  AvatarGroup,
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Blur } from '@/src/icons';
import { avatars } from '@/src/config/constants';
import AuthNavbarComponent from './auth-navbar-component';
import { Login, Register, SocialMedia, Verification } from 'src/components';

const AuthPageComponent = () => {
  const [state, setState] = useState<'login' | 'register' | 'verification'>(
    'login'
  );

  const breakpointValue = useBreakpointValue({ base: 'md', md: 'lg' });
  const { t } = useTranslation();

  const onNavigateStateComponent = (
    component: 'login' | 'register' | 'verification'
  ) => setState(component);

  const renderStateComponent = () => {
    switch (state) {
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'verification':
        return <Verification />;
    }
  };
  return (
    <>
      <AuthNavbarComponent />
      <Box pos={'relative'}>
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
            >
              {t('auth_page_title_1', { ns: 'global' })}{' '}
              <Text
                as={'span'}
                bgGradient="linear(to-r, gray.400,facebook.400)"
                bgClip="text"
              >
                &
              </Text>{' '}
              {t('auth_page_title_2', { ns: 'global' })}
            </Heading>
            <Stack direction={'row'} spacing={4} align={'center'}>
              <AvatarGroup>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    size={breakpointValue}
                    position={'relative'}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: 'full',
                      height: 'full',
                      rounded: 'full',
                      transform: 'scale(1.125)',
                      bgGradient: 'linear(to-bl, gray.400,facebook.400)',
                      position: 'absolute',
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>
              <Text fontSize={{ base: '4xl', md: '6xl' }}>+</Text>
              <Flex
                align={'center'}
                justify={'center'}
                fontSize={{ base: 'sm', md: 'lg' }}
                bg={'gray.800'}
                color={'white'}
                rounded={'full'}
                minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
                minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
                position={'relative'}
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'linear(to-bl, gray.400,facebook.400)',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              >
                {t('auth_page_you', { ns: 'global' })}
              </Flex>
            </Stack>
          </Stack>
          <Stack
            bg={useColorModeValue('gray.50', 'gray.900')}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}
          >
            {renderStateComponent()}
            <SocialMedia />
          </Stack>
        </Container>
        <Blur
          position={'absolute'}
          top={'0'}
          left={-10}
          style={{ filter: 'blur(70px)' }}
        />
      </Box>
    </>
  );
};

export default AuthPageComponent;
