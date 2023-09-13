import { navigation } from '@/src/config/constants';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { SidebarProps } from './sidebar.props';

const Sidebar = ({ toggle }: SidebarProps): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation();

  if (router.asPath == '/auth') {
    return (
      <Flex
        zIndex={888}
        w={{ base: 'full', lg: '300px' }}
        h={'90vh'}
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        borderRight={'1px'}
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        pos={'fixed'}
        left={{ base: toggle ? 0 : '-100%', md: '-100%' }}
        top={'10vh'}
        overflowY={'scroll'}
        css={{
          '&::-webkit-scrollbar': { width: '1px' },
          '&::-webkit-scrollbar-track': { width: '1px' },
          '&::-webkit-scrollbar-thumb': { background: 'transparent' },
        }}
        transition={'all .4s ease'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Container maxW={'container.xl'}>
          {
            <Box mt={10}>
              {navigation[1].links?.map((nav, index) => {
                const active = `/${router.pathname.split('/')[1]}` == nav.route;

                return (
                  <Link href={`${nav.route}`} key={index}>
                    <Button
                      colorScheme="facebook"
                      variant={active ? 'solid' : 'ghost'}
                      w={'full'}
                      justifyContent={'center'}
                      h={14}
                      mt={2}
                      _hover={{ backgroundColor: 'ghost' }}
                    >
                      <HStack gap={2}>
                        <Icon as={nav.icon} />
                        <Text>{t(nav.label, { ns: 'layout' })}</Text>
                      </HStack>
                    </Button>
                  </Link>
                );
              })}
            </Box>
          }
        </Container>
      </Flex>
    );
  } else {
    return (
      <Box
        zIndex={1001}
        w={{ base: 'full', lg: '300px' }}
        h={'90vh'}
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        borderRight={'1px'}
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        pos={'fixed'}
        left={{ base: toggle ? 0 : '-100%', lg: 0 }}
        top={'10vh'}
        overflowY={'scroll'}
        css={{
          '&::-webkit-scrollbar': { width: '1px' },
          '&::-webkit-scrollbar-track': { width: '1px' },
          '&::-webkit-scrollbar-thumb': { background: 'transparent' },
        }}
        transition={'all .4s ease'}
      >
        <Container maxW={'container.xl'}>
          {navigation?.map((item, index) => (
            <Box key={index} mt={10}>
              <Text>{t(item.title, { ns: 'layout' })}</Text>
              {item.links?.map((nav, index) => {
                const active = `/${router.pathname.split('/')[1]}` == nav.route;

                return (
                  <Link href={`${nav.route}`} key={index}>
                    <Button
                      colorScheme="facebook"
                      variant={active ? 'solid' : 'ghost'}
                      w={'full'}
                      justifyContent={'flex-start'}
                      h={14}
                      mt={2}
                    >
                      <HStack gap={2}>
                        <Icon as={nav.icon} />
                        <Text>{t(nav.label, { ns: 'layout' })}</Text>
                      </HStack>
                    </Button>
                  </Link>
                );
              })}
            </Box>
          ))}
        </Container>
      </Box>
    );
  }
};

export default Sidebar;
