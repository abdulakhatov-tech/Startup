import {
  Avatar,
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
  useToast,
} from '@chakra-ui/react';
import ReactStars from 'react-stars';
import { useTranslation } from 'react-i18next';

import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsMinecartLoaded } from 'react-icons/bs';
import { CiViewList } from 'react-icons/ci';
import { SiGoogleanalytics } from 'react-icons/si';

import { AllCoursesCardProps } from './all-courses-card.props';
import { useRouter } from 'next/router';
import { loadImage } from '@/src/helpers/image.helper';
import { useActions } from '@/src/hooks/useActions';
import { useTypedSelector } from '@/src/hooks/useTypedSelector';

const AllCoursesCard = ({ course }: AllCoursesCardProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { addCourseToCart } = useActions();
  const { courses } = useTypedSelector((state) => state.cart);
  const toast = useToast();

  const onDetailedCourse = () => router.push(`/courses/${course.slug}`);

  const addCourseToCardHandler = () => {
    const existingProduct = courses.find((c) => c._id === course._id);

    if (existingProduct) {
      toast({
        title: 'Course already exist in cart',
        position: 'bottom',
        status: 'warning',
      });
      return;
    }
    addCourseToCart(course);
    toast({ title: 'Course added successfully', position: 'bottom' });
  };

  return (
    <>
      <Box py={4}>
        <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
          <Image
            src={loadImage(course.previewImage)}
            alt={course.title}
            w={{ base: 'full', md: '250px' }}
            h={'250px'}
            borderRadius={'lg'}
            objectFit={'cover'}
            cursor={'pointer'}
            onClick={onDetailedCourse}
          />
          <Stack>
            <HStack>
              <Text color={'#e59819'}>{course.reviewAvg || 0}</Text>
              <ReactStars
                edit={false}
                value={course.reviewAvg || 5}
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
              <Avatar
                src={course.author.avatar}
                name={course.author.fullName}
              />

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
                  isDisabled={
                    courses.map((c) => c._id).includes(course._id)
                      ? true
                      : false
                  }
                  onClick={addCourseToCardHandler}
                >
                  {t('add_to_cart', { ns: 'courses' })}
                </Button>
                <Button
                  colorScheme={'facebook'}
                  variant={'outline'}
                  onClick={onDetailedCourse}
                  cursor={'pointer'}
                >
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
