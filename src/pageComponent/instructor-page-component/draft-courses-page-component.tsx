import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import {
  Box,
  Card,
  CardBody,
  Grid,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { InstructorDraftCourseCard } from 'src/components';
import SectionTitle from 'src/components/section-title/section-title';

const DraftCoursesPageComponent = () => {
  const { t } = useTranslation();
  const { courses } = useTypedSelector((state) => state.instructor);

  return (
    <>
      <Card>
        <CardBody p={0}>
          <HStack justify={'center'}>
            <Stack>
              <SectionTitle
                title={
                  t('draft_courses', { ns: 'instructor' }) || 'Draft courses'
                }
                subtitle={
                  t('draft_courses_description', { ns: 'instructor' }) ||
                  'Manage your draft courses and activated it'
                }
                style={{ maxWidth: '400px' }}
              />
            </Stack>
            <Image
              width={480}
              height={480}
              src="/images/draft.png"
              alt="instructor"
            />
          </HStack>
        </CardBody>
      </Card>
      <Box mt={10}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>{t('draft', { ns: 'instructor' }) || 'Draft'}</Tab>
            <Tab>{t('active', { ns: 'instructor' }) || 'Active'}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid gridTemplateColumns={'1fr 1fr'} gap={4}>
                {courses
                  .filter((c) => !c.isActive)
                  .map((item) => (
                    <InstructorDraftCourseCard key={item.slug} item={item} />
                  ))}
              </Grid>
            </TabPanel>
            <TabPanel>
              <Grid gridTemplateColumns={'1fr 1fr'} gap={4}>
                {courses
                  .filter((c) => c.isActive)
                  .map((item) => (
                    <InstructorDraftCourseCard key={item.slug} item={item} />
                  ))}
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default DraftCoursesPageComponent;
