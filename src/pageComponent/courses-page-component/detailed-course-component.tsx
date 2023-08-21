import { useState, useEffect } from 'react';

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
} from '@chakra-ui/react';
import ReactStars from 'react-stars';
import { format } from 'date-fns';

import { CourseType } from '@/src/interfaces/course.interface';
import { useRouter } from 'next/router';
import { courses } from '@/src/config/constants';
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

const DetailedCourseComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [media] = useMediaQuery('min-width: 592px');

  const [course, setData] = useState<CourseType>();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const currentCourse = courses.find((c) => c.slug === router.query.slug);
    setData(currentCourse);
  }, [router.query]);

  const tabHandler = (idx: number) => {
    setTabIndex(idx);
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
              <Text mt={5}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                fuga doloremque mollitia architecto minus? Laudantium
                praesentium nam odio tempore nobis.
              </Text>
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
                    {format(new Date(), 'dd, MMMM, yyyy')}
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
                    src={course?.previewImage}
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
                      {t('free', { ns: 'courses' })}
                    </Heading>
                    <Text textDecoration={'line-through'}>
                      {course?.price.toLocaleString('en-US', {
                        currency: 'USD',
                        style: 'currency',
                      })}
                    </Text>
                  </Stack>
                  <Button w={'full'} mt={5} h={14} colorScheme="facebook">
                    {t('enroll', { ns: 'courses' })}
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
                      <Text>English</Text>
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
          {tabIndex === 2 && <CourseReview />}
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
