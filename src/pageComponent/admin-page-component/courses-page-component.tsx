import AdminCourseCard from '@/src/components/admin-course-card/admin-course-card';
import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import { Box, Card, CardBody, Flex, Grid, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import SectionTitle from 'src/components/section-title/section-title';
import { LaunchCourseIcon } from 'src/icons';

const CoursesPageComponent = () => {
  const { t } = useTranslation();
  const { courses } = useTypedSelector((state) => state.admin);
  return (
    <>
      <Card mt={10}>
        <CardBody>
          <HStack>
            <Box w={'30%'}>
              <SectionTitle
                title={t('courses_section_title', { ns: 'admin' }) || 'Courses'}
                subtitle={
                  t('courses_section_descr', { ns: 'admin' }) ||
                  'All courses and managing on platform'
                }
              />
            </Box>
            <Flex w={'70%'} justify={'flex-end'}>
              <LaunchCourseIcon />
            </Flex>
          </HStack>
        </CardBody>
      </Card>
      <Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={4}>
        {courses.map((c) => (
          <AdminCourseCard key={c._id} course={c} />
        ))}
      </Grid>
    </>
  );
};

export default CoursesPageComponent;
