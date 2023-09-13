import $axios from '@/src/api/axios';
import { ErrorAlert } from '@/src/components';
import { getPaymentUrl } from '@/src/config/api.config';
import { useActions } from '@/src/hooks/useActions';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillTrashFill } from 'react-icons/bs';
import SectionTitle from 'src/components/section-title/section-title';
import { loadImage } from 'src/helpers/image.helper';
import { getTotalPrice } from 'src/helpers/total-price.helper';
import { useTypedSelector } from 'src/hooks/useTypedSelector';

const CartPageComponent = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cart = useTypedSelector((state) => state.cart);
  const { editCourseCart } = useActions();

  const router = useRouter();

  const getSubtitle = () => {
    let textCourse: string = '';
    let textBooks: string = '';
    const courses = cart.courses;
    const books = cart.books;

    textCourse = courses.length
      ? `${courses.length} ${t('courses_in_cart', { ns: 'cart' })}`
      : '';
    textBooks = books.length
      ? `${books.length} ${t('books_in_cart', { ns: 'cart' })}`
      : '';
    const isAnd = books.length ? true : false;

    return `${textCourse} ${
      isAnd ? `${t('and', { ns: 'cart' })}` : ''
    } ${textBooks}`;
  };

  const applyCouponHandler = async () => {
    if (active) return;
    try {
      setIsLoading(true);
      const { data } = await $axios.get(
        `${getPaymentUrl('apply-coupon')}/${coupon}`
      );
      if (data.valid) {
        setActive(true);
        const newArr = cart.courses.map((item) => ({
          ...item,
          price: item.price - (data.percent_off / 100) * item.price,
        }));
        editCourseCart(newArr);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(`${t('coupon_is_invalid', { ns: 'cart' })}`);
    }
  };

  return (
    <>
      <SectionTitle
        title={t('title', { ns: 'cart' })}
        subtitle={getSubtitle()}
      />
      <Grid gridTemplateColumns={{ base: '1fr', md: '70% 30%' }} gap={5}>
        <GridItem>
          <Divider my={5} />
          {cart.books.map((book) => (
            <Fragment key={book._id}>
              <ShoppingCartCard item={book} image={book.image} />
              <Divider my={5} />
            </Fragment>
          ))}
          {cart.courses.map((book) => (
            <Fragment key={book._id}>
              <ShoppingCartCard item={book} image={book.previewImage} />
              <Divider my={5} />
            </Fragment>
          ))}
        </GridItem>
        <GridItem>
          <Stack
            mt={5}
            border={'1px'}
            borderRadius={'md'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            p={5}
          >
            <Text fontWeight={'bold'} fontSize={'xl'} opacity={'.7'}>
              {t('total', { ns: 'cart' })}:
            </Text>
            <Heading>
              {getTotalPrice(cart.courses, cart.books).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Heading>
            <Button
              h={14}
              colorScheme={'facebook'}
              borderRadius={0}
              onClick={() => router.push('/shop/checkout')}
            >
              {t('checkout', { ns: 'cart' })}
            </Button>
            <Divider />
            {error && (
              <ErrorAlert title={error} clearHandler={() => setError('')} />
            )}
            {active && (
              <Alert status="success">
                <AlertIcon />
                {t('coupon_successful', { ns: 'cart' })}
              </Alert>
            )}
            <Text fontWeight={'bold'} fontSize={'lg'}>
              {t('promotions', { ns: 'cart' })}
            </Text>
            <Box pos={'relative'} mt={5}>
              <Input
                w={'full'}
                bg={'white'}
                color={'gray.900'}
                placeholder={`${t('enter_coupon', { ns: 'cart' })}`}
                _placeholder={{ color: 'gray.500' }}
                borderRadius={0}
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button
                onClick={applyCouponHandler}
                pos={'absolute'}
                right={0}
                top={0}
                isLoading={isLoading}
                colorScheme={'facebook'}
                zIndex={999}
                borderRadius={0}
              >
                {t('apply', { ns: 'cart' })}
              </Button>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
};

export default CartPageComponent;

const ShoppingCartCard = ({ item, image }) => {
  const { t } = useTranslation();
  const { removeBookFromCart, removeCourseFromCart } = useActions();

  const removeCartItem = () => {
    if (item.previewImage) {
      removeCourseFromCart(item._id);
    } else {
      removeBookFromCart(item._id);
    }
  };

  return (
    <Flex
      justify={{ base: 'flex-start', md: 'space-between' }}
      direction={{ base: 'column', xl: 'row' }}
    >
      <Flex gap={'20px'} direction={{ base: 'column', sm: 'row' }}>
        <Box
          pos={'relative'}
          w={{ base: '100%', sm: '200px' }}
          h={{ base: '180px', sm: '100px' }}
        >
          <Image
            fill
            src={loadImage(image)}
            alt={item.title}
            style={{ objectFit: 'cover', borderRadius: '10px' }}
          />
        </Box>
        <Stack>
          <Heading fontSize={'xl'}>{item.title}</Heading>
          <Text>by Admin Platform</Text>
          <HStack>
            <Tag colorScheme={'facebook'}>{t('books', { ns: 'cart' })}</Tag>
            <Tag colorScheme={'facebook'}>{t('useful', { ns: 'cart' })}</Tag>
            <Tag colorScheme={'facebook'} textTransform={'capitalize'}>
              {item.category}
            </Tag>
          </HStack>
        </Stack>
      </Flex>
      <Stack spacing={0} mt={{ base: 5, md: 0 }}>
        <Text
          color={'facebook.300'}
          fontSize={'2xl'}
          fontWeight={'bold'}
          textAlign={{ base: 'center' }}
        >
          {item.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Text>
        <IconButton
          aria-label="remove"
          icon={<BsFillTrashFill />}
          colorScheme={'red'}
          h="14"
          onClick={removeCartItem}
        />
      </Stack>
    </Flex>
  );
};
