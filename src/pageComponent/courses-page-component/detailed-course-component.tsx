import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import ReactStars from 'react-stars';
import { format } from 'date-fns';

import { CourseType, ReviewType } from '@/src/interfaces/course.interface';
import { useRouter } from 'next/router';
import {
  FaBook,
  FaLanguage,
  FaRibbon,
  FaStar,
  FaUserGraduate,
  FaUserTie,
} from 'react-icons/fa';
import { TfiAlarmClock, TfiTimer } from 'react-icons/tfi';
import { MdPlayLesson } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { BsBarChart } from 'react-icons/bs';
import { TbCertificate } from 'react-icons/tb';
import { GiInfinity } from 'react-icons/gi';
import {
  CourseCurriculum,
  CourseMentor,
  CourseOverview,
  CourseReview,
} from '@/src/components';
import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import { loadImage } from '@/src/helpers/image.helper';
import { useActions } from '@/src/hooks/useActions';
import { CourseService } from '@/src/services/course.service';

const DetailedCourseComponent = () => {
  const { t } = useTranslation();
  const { course } = useTypedSelector((state) => state.course);
  const { sections } = useTypedSelector((state) => state.section);
  const { courses } = useTypedSelector((state) => state.cart);
  const { user } = useTypedSelector((state) => state.user);
  const [media] = useMediaQuery('min-width: 592px');
  const router = useRouter();
  const toast = useToast();
  const { getSection, addCourseToCart } = useActions();
  const [isLoading, setIsLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const tabHandler = async (idx: number) => {
    setTabIndex(idx);
    if (idx == 1 && !sections.length) {
      getSection({ courseId: course?._id, callback: () => {} });
    } else if (idx == 2 && !reviews.length) {
      setIsLoading(true);
      const response = await CourseService.getReviews(course?._id);
      setReviews(response);
      setIsLoading(false);
    }
  };

  const navigateUser = () => {
    if (user?.courses.includes(course?._id as string)) {
      router.push(`/courses/dashboard/${course?.slug}`);
    } else {
      const existingProduct = courses.find((c) => c._id == course?._id);

      if (existingProduct) {
        toast({
          title: 'Course already exist in cart',
          position: 'bottom',
          status: 'warning',
        });
        return;
      }
      addCourseToCart(course as CourseType);
      toast({
        title: 'Course added successfully',
        position: 'bottom',
      });
    }
  };

  return (
    <>
      <Card>
        <CardBody pos="relative" p={{ base: 2, md: 5 }}>
          <Stack direction={{ base: 'column', md: 'row' }} gap={5}>
            <Box w={{ base: '100%', lg: '60%' }}>
              <Heading mt={5} fontSize={'3xl'}>
                {course?.title}
              </Heading>
              <Text mt={5}>{course?.excerpt}</Text>
              <Stack mt={5} direction={media ? 'column' : 'row'} gap={3}>
                <Flex fontSize={'sm'} align={'flex-end'}>
                  <Text>5.0</Text>
                  <ReactStars edit={false} value={5} />
                  <Text>(10)</Text>
                </Flex>
                <Flex fontSize={'sm'} align={'center'} gap={1}>
                  <Icon as={FaUserGraduate} />
                  <Text>100 {t('students', { ns: 'courses' })}</Text>
                </Flex>
                <Flex fontSize={'sm'} align={'center'} gap={1}>
                  <Icon as={TfiAlarmClock} />
                  <Text>
                    {t('last_update', { ns: 'courses' })}{' '}
                    {course &&
                      format(new Date(course.updatedAt), 'dd MMMM, yyyy')}
                  </Text>
                </Flex>
              </Stack>
            </Box>

            <Box
              w={{ base: '100%', lg: '39%' }}
              position={{ base: 'relative', lg: 'absolute' }}
              right={{ base: 0, lg: 2 }}
            >
              <Card variant={'outline'} boxShadow={'dark-lg'}>
                <CardBody p={{ base: 2, lg: 5 }}>
                  <Image
                    src={loadImage(course?.previewImage)}
                    alt={course?.title}
                    w={'full'}
                    h={'300px'}
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <Stack
                    direction={'row'}
                    mt={5}
                    align={'flex-end'}
                    justify={'space-between'}
                  >
                    <Heading fontSize={'2xl'}>
                      {course?.price.toLocaleString('en-US', {
                        currency: 'USD',
                        style: 'currency',
                      })}
                    </Heading>
                  </Stack>
                  <Button
                    w={'full'}
                    mt={5}
                    h={14}
                    colorScheme="facebook"
                    onClick={navigateUser}
                  >
                    {user?.courses.includes(course?._id as string)
                      ? 'Watch'
                      : 'Add to cart'}
                  </Button>
                  <Box mt={3}>
                    <Flex
                      justify={'space-between'}
                      align={'center'}
                      py={2}
                      px={2}
                      fontSize={'17px'}
                    >
                      <Flex align={'center'} gap={3}>
                        <MdPlayLesson />
                        <Text fontWeight={'bold'}>
                          {t('lessons', { ns: 'courses' })}
                        </Text>
                      </Flex>
                      <Text>{course?.lessonCount}</Text>
                    </Flex>
                    <Divider />
                    <Flex
                      justify={'space-between'}
                      align={'center'}
                      py={2}
                      px={2}
                      fontSize={'17px'}
                    >
                      <Flex align={'center'} gap={3}>
                        <TfiTimer />
                        <Text fontWeight={'bold'}>
                          {t('total_hour', { ns: 'courses' })}
                        </Text>
                      </Flex>
                      <Text>
                        {course?.totalHour} {t('hour', { ns: 'courses' })}
                      </Text>
                    </Flex>
                    <Divider />
                    <Flex
                      justify={'space-between'}
                      align={'center'}
                      py={2}
                      px={2}
                      fontSize={'17px'}
                    >
                      <Flex align={'center'} gap={3}>
                        <BsBarChart />
                        <Text fontWeight={'bold'}>
                          {t('level', { ns: 'courses' })}
                        </Text>
                      </Flex>
                      <Text>{course?.level}</Text>
                    </Flex>
                    <Divider />
                    <Flex
                      justify={'space-between'}
                      align={'center'}
                      py={2}
                      px={2}
                      fontSize={'17px'}
                    >
                      <Flex align={'center'} gap={3}>
                        <FaLanguage />
                        <Text fontWeight={'bold'}>
                          {t('language', { ns: 'courses' })}
                        </Text>
                      </Flex>
                      <Text>{course?.language.toUpperCase()}</Text>
                    </Flex>
                    <Divider />
                    <Flex
                      justify={'space-between'}
                      align={'center'}
                      py={2}
                      px={2}
                      fontSize={'17px'}
                    >
                      <Flex align={'center'} gap={3}>
                        <TbCertificate />
                        <Text fontWeight={'bold'}>
                          {t('sertificate', { ns: 'courses' })}
                        </Text>
                      </Flex>
                      <Text>No</Text>
                    </Flex>
                    <Divider />
                    <Flex
                      justify={'space-between'}
                      align={'center'}
                      py={2}
                      px={2}
                      fontSize={'17px'}
                    >
                      <Flex align={'center'} gap={3}>
                        <GiInfinity />
                        <Text fontWeight={'bold'}>
                          {t('access', { ns: 'courses' })}
                        </Text>
                      </Flex>
                      <Text>Lifetime</Text>
                    </Flex>
                    <Divider />
                  </Box>
                </CardBody>
              </Card>
            </Box>
          </Stack>
        </CardBody>
      </Card>

      <Tabs
        mt={5}
        mb={'5vh'}
        w={{ base: '100%', lg: '60%' }}
        orientation={'horizontal'}
        onChange={tabHandler}
        defaultValue={tabIndex}
        isFitted
        colorScheme={'facebook'}
      >
        <TabList>
          {tablist?.map((tab) => (
            <Tab
              key={tab.name}
              fontWeight="bold"
              textTransform="capitalize"
              w="100%"
              justifyContent={'center'}
            >
              <Icon
                as={tab.Icon}
                mr="2"
                display={{ base: 'none', md: 'block' }}
              />{' '}
              {t(tab.name, { ns: 'courses' })}
            </Tab>
          ))}
        </TabList>
        <Box w={'full'}>
          {tabIndex === 0 && <CourseOverview />}
          {tabIndex === 1 && <CourseCurriculum />}
          {tabIndex === 2 && (
            <CourseReview reviews={reviews} isLoading={isLoading} />
          )}
          {tabIndex === 3 && <CourseMentor />}
        </Box>
      </Tabs>
    </>
  );
};

export default DetailedCourseComponent;

const tablist = [
  {
    name: 'overview',
    Icon: FaRibbon,
  },
  {
    name: 'curriculum',
    Icon: FaBook,
  },
  {
    name: 'review',
    Icon: FaStar,
  },
  {
    name: 'mentor',
    Icon: FaUserTie,
  },
];
