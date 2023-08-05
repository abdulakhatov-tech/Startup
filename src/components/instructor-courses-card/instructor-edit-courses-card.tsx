import { FC } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { HiOutlineStatusOnline } from 'react-icons/hi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { SiGoogleanalytics } from 'react-icons/si';
import { VscOpenPreview } from 'react-icons/vsc';
import { CiViewList } from 'react-icons/ci';
import { FiEdit2 } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';

import { InstructorCoursesCardProps } from './instructor-courses-card.props';
import { useTranslation } from 'react-i18next';
import { loadImage } from '@/src/helpers/image.helper';

const InstructorEditCoursesCard: FC<InstructorCoursesCardProps> = ({
  item,
}): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Flex
      justifyContent={'center'}
      key={item.title}
      p={5}
      boxShadow={'dark-lg'}
      mt={5}
      borderRadius={'lg'}
    >
      <Stack spacing={5}>
        <Box pos={'relative'} w={'full'} h={'300px'}>
          <Image
            fill
            src={loadImage(item.previewImage)}
            style={{ objectFit: 'cover', borderRadius: '10px' }}
            alt={item.title}
          />
        </Box>
        <Text fontSize={'20px'} color={'facebook.500'} fontWeight={'bold'}>
          {item.level}
        </Text>
        <Heading>{item.title}</Heading>
        <HStack>
          <Flex align={'center'} gap={1}>
            <Icon as={CiViewList} />
            <Text>
              {item.lessonCount} {t('lesson', { ns: 'instructor' }) || 'lesson'}
            </Text>
          </Flex>
          <Flex align={'center'} gap={1}>
            <Icon as={AiOutlineClockCircle} />
            <Text>
              {item.totalHour} {t('hour', { ns: 'instructor' }) || 'hours'}
            </Text>
          </Flex>
          <Flex align={'center'} gap={1}>
            <Icon as={SiGoogleanalytics} />
            <Text>{item.level}</Text>
          </Flex>
        </HStack>
        <Divider />
        <HStack>
          <Button rightIcon={<VscOpenPreview />}>
            {t('preview', { ns: 'instructor' }) || 'Preview'}
          </Button>
          <Button
            rightIcon={<FiEdit2 />}
            onClick={() => router.push(`/instructor/edit-courses/${item.slug}`)}
          >
            Edit
          </Button>
          <Button rightIcon={<BsTrash />}>
            {t('delete_course', { ns: 'instructor' }) || 'Delete'}
          </Button>
          <Button rightIcon={<HiOutlineStatusOnline />}>
            {t('status', { ns: 'instructor' }) || 'Status'}
          </Button>
        </HStack>
      </Stack>
    </Flex>
  );
};

export default InstructorEditCoursesCard;
