import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import ReactStars from 'react-stars';
import { useTranslation } from 'react-i18next';

import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsMinecartLoaded } from 'react-icons/bs';
import { CiViewList } from 'react-icons/ci';
import { SiGoogleanalytics } from 'react-icons/si';

import { AllCoursesCardProps } from './all-courses-card.props';

const AllCoursesCard = ({ course }: AllCoursesCardProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Box py={4}>
        <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
          <Image
            src={course.image}
            alt={course.title}
            w={{ base: 'full', md: '250px' }}
            h={'250px'}
            borderRadius={'lg'}
            objectFit={'cover'}
          />
          <Stack>
            <HStack>
              <Text color={'#e59819'}>{course.reviewAvarage.toFixed(1)}</Text>
              <ReactStars
                edit={false}
                value={course.reviewAvarage}
                color2={'#e59819'}
              />
              <Text opacity={'.8'}>({course.reviewCount})</Text>
            </HStack>
            <Heading fontSize={'xl'}>{course.title}</Heading>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium nostrum laboriosam est ut.
            </Text>
            <Flex
              gap={2}
              fontSize={'14px'}
              direction={{ base: 'column', sm: 'row' }}
              flexWrap={'wrap'}
            >
              <HStack align={'center'}>
                <Image
                  src={course.author.avatar}
                  alt={course.author.firstName}
                  w={50}
                  h={50}
                  borderRadius={'full'}
                />
                <Text>
                  {course.author.firstName} {course.author.lastName[0]}.
                </Text>
              </HStack>
              <Flex flexWrap={'wrap'} gap={2}>
                <Flex align={'center'} gap={1}>
                  <Icon as={CiViewList} />
                  <Text>
                    {course.lessonCount} {t('lessons', { ns: 'courses' })}
                  </Text>
                </Flex>
                <Flex align={'center'} gap={1}>
                  <Icon as={AiOutlineClockCircle} />
                  <Text>
                    {course.totalHour} {t('hours', { ns: 'courses' })}
                  </Text>
                </Flex>
                <Flex align={'center'} gap={1}>
                  <Icon as={SiGoogleanalytics} />
                  <Text>{course.level}</Text>
                </Flex>
              </Flex>
            </Flex>
            <Divider />
            <Flex
              align={{ base: 'flex-start', md: 'center' }}
              justify={'space-between'}
              direction={{ base: 'column', sm: 'row' }}
              flexWrap={'wrap'}
              gap="15px"
            >
              <Text fontSize={'xl'} fontWeight={'bold'}>
                {course.price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Text>
              <Flex gap={4} flexWrap={'wrap'}>
                <Button
                  rightIcon={<BsMinecartLoaded />}
                  colorScheme={'facebook'}
                >
                  {t('add_to_cart', { ns: 'courses' })}
                </Button>
                <Button colorScheme={'facebook'} variant={'outline'}>
                  {t('detail', { ns: 'courses' })}
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Box>
      <Divider />
    </>
  );
};

export default AllCoursesCard;
