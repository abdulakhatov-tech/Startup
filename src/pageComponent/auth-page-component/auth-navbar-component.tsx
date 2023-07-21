import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { BiMenuAltLeft } from 'react-icons/bi';
import { useState } from 'react';

import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';

import { language, navigation } from 'src/config/constants';
import { Logo } from 'src/icons';
import Sidebar from '@/src/layouts/sidebar/sidebar';

const AuthNavbarComponent = () => {
  const { t, i18n } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const linkHover = useColorModeValue('black', 'white');
  const linkColor = useColorModeValue('facebook.700', 'facebook.300');
  const [toggle, setToggle] = useState<boolean>(false);

  const onToggle = () => setToggle((prev) => !prev);

  const onLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Box
        w={'full'}
        zIndex={999}
        h={'10vh'}
        pos={{ base: toggle ? 'fixed' : 'static', md: 'static' }}
        top="0"
        bg={{
          base: toggle
            ? useColorModeValue('gray.50', '#1A202C')
            : 'transparent',
          md: 'transparent',
        }}
      >
        <Container maxW={'container.lg'}>
          <Flex align={'center'} justify={'space-between'} h={'10vh'}>
            <HStack>
              <Icon
                display={{ base: 'block', md: 'none' }}
                as={BiMenuAltLeft}
                onClick={onToggle}
                w={6}
                h={6}
                cursor={'pointer'}
              />
              <Link href={'/'}>
                {colorMode === 'light' ? <Logo /> : <Logo />}
              </Link>
            </HStack>
            <HStack gap={5}>
              <HStack gap={5} display={{ base: 'none', md: 'flex' }}>
                {navigation[1]?.links?.map((nav) => (
                  <Link href={nav.route}>
                    <Box
                      color={linkColor}
                      fontWeight={400}
                      _hover={{ textDecoration: 'underline', color: linkHover }}
                      as="a"
                    >
                      {t(nav.label, { ns: 'layout' })}
                    </Box>
                  </Link>
                ))}
              </HStack>
              <Menu placement="bottom">
                <MenuButton
                  as={Button}
                  rightIcon={<TbWorld />}
                  textTransform={'capitalize'}
                  colorScheme={'facebook'}
                  variant={'ghost'}
                >
                  {i18n.resolvedLanguage}
                </MenuButton>
                <MenuList p={0}>
                  {language?.map((item) => (
                    <MenuItem
                      key={item.lng}
                      onClick={() => onLanguage(item.lng)}
                      icon={<item.icon />}
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
                icon={
                  colorMode == 'light' ? <BsFillMoonFill /> : <BsFillSunFill />
                }
                colorScheme={'facebook'}
                variant={'outline'}
              />
            </HStack>
          </Flex>
        </Container>
      </Box>
      <Sidebar toggle={toggle} />
    </>
  );
};

export default AuthNavbarComponent;
