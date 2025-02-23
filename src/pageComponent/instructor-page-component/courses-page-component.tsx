import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import {
  Card,
  CardBody,
  Flex,
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
import { InstructorCoursesCard } from 'src/components';
import SectionTitle from 'src/components/section-title/section-title';

const CoursesPageComponent = () => {
  const { t } = useTranslation();
  const { courses } = useTypedSelector((state) => state.instructor);

  return (
    <>
      <Card>
        <CardBody p={0}>
          <Flex
            alignItems={'center'}
            px={5}
            py={{ base: 5, md: 0 }}
            direction={{ base: 'column-reverse', md: 'row' }}
            gap={'30px'}
          >
            <Stack>
              <SectionTitle
                title={t('all_courses_title', { ns: 'instructor' })}
                subtitle={t('all_courses_description', { ns: 'instructor' })}
                style={{ maxWidth: '400px' }}
              />
            </Stack>
            <Image
              width={480}
              height={480}
              src="/images/manage.png"
              alt="instructor"
            />
          </Flex>
        </CardBody>
      </Card>

      <Tabs isFitted variant="enclosed" mt={10}>
        <TabList mb="1em">
          <Tab>{t('all_courses_title', { ns: 'instructor' })}</Tab>
          <Tab>{t('active_courses', { ns: 'instructor' })}</Tab>
          <Tab>{t('draft_courses', { ns: 'instructor' })}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {courses.map((item) => (
              <InstructorCoursesCard key={item.slug} item={item} />
            ))}
          </TabPanel>
          <TabPanel>
            {courses
              .filter((c) => c.isActive)
              .map((item) => (
                <InstructorCoursesCard key={item.slug} item={item} />
              ))}
          </TabPanel>
          <TabPanel>
            {courses
              .filter((c) => !c.isActive)
              .map((item) => (
                <InstructorCoursesCard key={item.slug} item={item} />
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default CoursesPageComponent;
