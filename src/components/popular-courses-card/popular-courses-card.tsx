import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import ReactStars from 'react-stars';
import { useTranslation } from 'react-i18next';

import { AiOutlineClockCircle } from 'react-icons/ai';
import { SiGoogleanalytics } from 'react-icons/si';
import { CiViewList } from 'react-icons/ci';

import { PopularCoursesCardProps } from './popular-courses-card.props';
import Image from 'next/image';

const PopularCoursesCard = ({ item }: PopularCoursesCardProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Stack spacing={3} p={3} cursor={'pointer'}>
      <Box pos={'relative'} w={'full'} h="210px">
        <Image
          src={item.previewImage}
          alt={t(item.title, { ns: 'home' }) || ''}
          fill
          style={{ objectFit: 'cover', borderRadius: '10px' }}
        />
      </Box>
      <HStack>
        <Text color={'#e59819'}>{5}</Text>
        <ReactStars edit={false} value={5} color2={'#e59819'} />
        <Text opacity={'.8'}>(3)</Text>
      </HStack>
      <Heading fontSize={'xl'}>{item.title}</Heading>
      <HStack>
        <Flex align={'center'} gap={1}>
          <Icon as={CiViewList} />
          <Text>
            {item.lessonCount} {t('lesson', { ns: 'instructor' }) || 'Lesson'}
          </Text>
        </Flex>
        <Flex align={'center'} gap={1}>
          <Icon as={AiOutlineClockCircle} />
          <Text>
            {item.totalHour || 10} {item.lessonCount}{' '}
            {t('hour', { ns: 'instructor' }) || 'Hour'}{' '}
          </Text>
        </Flex>
        <Flex align={'center'} gap={1}>
          <Icon as={SiGoogleanalytics} />
          <Text>{item.level}</Text>
        </Flex>
      </HStack>
      <Divider />
      <Flex justify={'space-between'} align={'center'}>
        <HStack align={'center'}>
          <Avatar src={item.author.avatar} name={item.author.fullName} />

          <Text>{item.author.fullName}</Text>
        </HStack>
        <Text>
          {item.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Text>
      </Flex>
    </Stack>
  );
};

export default PopularCoursesCard;
