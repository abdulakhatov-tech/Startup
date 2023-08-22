import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AdminInstructorTable } from 'src/components';
import SectionTitle from 'src/components/section-title/section-title';
import { RecordVideoIcon } from 'src/icons';

const InstructorsPageComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <Card mt={10}>
        <CardBody>
          <HStack>
            <Box w={'30%'}>
              <SectionTitle
                title={
                  t('instructors_section_title', { ns: 'admin' }) ||
                  'Instructors'
                }
                subtitle={
                  t('instructors_section_descr', { ns: 'admin' }) ||
                  'Managing instructors on platform'
                }
              />
            </Box>
            <Flex w={'70%'} justify={'flex-end'}>
              <RecordVideoIcon />
            </Flex>
          </HStack>
        </CardBody>
      </Card>
      <Box mt={10} mx={'auto'}>
        <Tabs isFitted variant="solid-rounded" colorScheme={'facebook'}>
          <TabList mb="1em">
            <Tab>
              {t('approved_instructors', { ns: 'admin' }) ||
                'Approved instructors'}
            </Tab>
            <Tab>
              {t('applied_instructors', { ns: 'admin' }) ||
                'Applied instructors'}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AdminInstructorTable />
            </TabPanel>
            <TabPanel>
              <AdminInstructorTable />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default InstructorsPageComponent;
