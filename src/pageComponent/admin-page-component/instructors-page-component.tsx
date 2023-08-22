import { useTypedSelector } from '@/src/hooks/useTypedSelector';
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
  const { instructors } = useTypedSelector((state) => state.admin);

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
      <TabPanels>
        <TabPanel>
          <AdminInstructorTable
            instructors={instructors.filter((c) => c.approved)}
            approved={true}
          />
        </TabPanel>
        <TabPanel>
          <AdminInstructorTable
            instructors={instructors.filter((c) => !c.approved)}
            approved={false}
          />
        </TabPanel>
      </TabPanels>
    </>
  );
};

export default InstructorsPageComponent;
