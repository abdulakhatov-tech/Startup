import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import { Box, Flex, Grid, Heading, Icon, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { BsCheck, BsQuestionCircle } from 'react-icons/bs';

const CourseOverview = () => {
  const { t } = useTranslation();
  const { course } = useTypedSelector((state) => state.course);
  return (
    <>
      <Heading mt={10}>{t('overview', { ns: 'courses' })}</Heading>
      <Box
        mt={3}
        dangerouslySetInnerHTML={{ __html: course?.description as string }}
      />
      <Heading mt={10}>{t('what_you_will_learn', { ns: 'courses' })}</Heading>
      <Grid
        mt={5}
        gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        {course?.learn.map((text, idx) => (
          <Flex key={idx} gap={3} align={'center'} my={1}>
            <Icon as={BsCheck} w={6} h={6} borderRadius={'100%'} p={1} />
            <Text>{text}</Text>
          </Flex>
        ))}
      </Grid>
      <Heading mt={10}>{t('required', { ns: 'courses' })}</Heading>
      <Box mt={3}>
        {course?.requirements.map((text, idx) => (
          <Flex key={idx} gap={2} align={'center'} mt={2}>
            <Icon as={BsQuestionCircle} w={5} h={5} />
            <Text>{text}</Text>
          </Flex>
        ))}
      </Box>
    </>
  );
};

export default CourseOverview;
