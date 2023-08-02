import { Logo } from '@/src/icons';
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Icon,
  Avatar,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useAuth } from '@/src/hooks/useAuth';

import { BsFillMoonFill, BsFillSunFill, BsTranslate } from 'react-icons/bs';
import { BiMenuAltLeft, BiUserCircle } from 'react-icons/bi';
import { AiOutlineLogin } from 'react-icons/ai';
import { TbFileSettings } from 'react-icons/tb';
import { IoIosLogOut } from 'react-icons/io';

import { language } from '@/src/config/constants';
import { HeaderProps } from './header.props';
import { useActions } from '@/src/hooks/useActions';

const Header = ({ onToggle }: HeaderProps): JSX.Element => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const { logout } = useActions();

  const onLanguage = (lng: string) => {
    router.replace(router.asPath);
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      zIndex={1001}
      w={'full'}
      h={'10vh'}
      px={{ base: 5, md: 10 }}
      borderBottom={'1px'}
      pos={'fixed'}
      top={0}
      left={0}
      right={0}
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Flex h="full" justify={'space-between'} align={'center'}>
        <HStack>
          <Icon
            as={BiMenuAltLeft}
            onClick={onToggle}
            w={6}
            h={6}
            cursor={'pointer'}
          />
          <Link href={'/'}>{colorMode === 'light' ? <Logo /> : <Logo />}</Link>
        </HStack>
        <HStack>
          <Menu placement="bottom">
            <MenuButton
              as={Button}
              rightIcon={<BsTranslate />}
              colorScheme={'gray'}
              variant={'outline'}
              textTransform={'capitalize'}
            >
              {i18n.resolvedLanguage}
            </MenuButton>
            <MenuList p="0">
              {language?.map((item) => (
                <MenuItem
                  key={item.lng}
                  icon={<item.icon />}
                  onClick={() => onLanguage(item.lng)}
                  backgroundColor={
                    i18n.resolvedLanguage === item.lng ? 'facebook.500' : ''
                  }
                >
                  {item.nativeLng}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <IconButton
            aria-label="color-mode"
            onClick={toggleColorMode}
            icon={colorMode == 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
            colorScheme={'facebook'}
            variant={'outline'}
          />
          {user ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar backgroundColor={'facebook.500'} />
              </MenuButton>
              <MenuList p={0} m={0}>
                <MenuItem
                  h={14}
                  onClick={() => router.push('/setting')}
                  fontWeight={'bold'}
                  icon={<TbFileSettings fontSize={17} />}
                >
                  Settings
                </MenuItem>
                <MenuItem
                  h={14}
                  onClick={logout}
                  fontWeight={'bold'}
                  icon={<IoIosLogOut fontSize={17} />}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                display={{ base: 'none', md: 'flex' }}
                onClick={() => router.push('/auth')}
                rightIcon={<BiUserCircle fontSize={'22px'} />}
                colorScheme={'facebook'}
              >
                {t('login', { ns: 'layout' })}
              </Button>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="login"
                onClick={() => router.push('/auth')}
                icon={<AiOutlineLogin />}
                colorScheme={'facebook'}
                variant={'outline'}
              />
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
