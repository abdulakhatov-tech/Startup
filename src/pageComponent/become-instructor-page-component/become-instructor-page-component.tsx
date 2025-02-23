import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SectionTitle from '@/src/components/section-title/section-title';
import { courseLng, teachValues } from '@/src/config/constants';
import {
  LaunchCourseIcon,
  PlanCurriculumIcon,
  RecordVideoIcon,
} from 'src/icons';
import { Form, Formik } from 'formik';
import TextField from '@/src/components/text-field/text-field';
import { GoVerified } from 'react-icons/go';
import { InstructorValidation } from 'src/validations/instructor.validation';
import { useActions } from '@/src/hooks/useActions';
import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import { ErrorAlert, SelectField } from '@/src/components';
import Image from 'next/image';

const BecomeInstructorPageComponent = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { applyInstructor, clearInstructorError } = useActions();
  const { error, isLoading } = useTypedSelector((state) => state.instructor);

  const onSubmit = (formData) => {
    applyInstructor({
      ...formData,
      callback: () => {
        toast({
          title: t('successfully_sent', { ns: 'global' }),
          description: t('contact_with_you_coming_soon', { ns: 'global' }),
          isClosable: true,
          position: 'top-right',
        });
        onClose();
      },
    });
  };

  return (
    <Stack spacing={5}>
      <Card>
        <CardBody p={{ base: 3, md: 5 }}>
          <Flex
            alignItems={'center'}
            justifyContent={'space-around'}
            direction={{ base: 'column-reverse', lg: 'row' }}
            gap="30px"
          >
            <Stack px={5}>
              <SectionTitle
                textAlign={'center'}
                title={t('instructor_page_title', { ns: 'instructor' })}
                subtitle={t('instructor_page_description', {
                  ns: 'instructor',
                })}
              />
              <Button onClick={onOpen} h={14} colorScheme="facebook">
                {t('instructor_page_get_started', { ns: 'instructor' })}
              </Button>
            </Stack>
            <Image
              src="/images/instructor.png"
              alt="instructor"
              width={500}
              height={500}
            />
          </Flex>
        </CardBody>
      </Card>
      <Heading mt={10} textAlign={'center'}>
        {t('instructor_page_many_resaon', { ns: 'instructor' })}
      </Heading>
      <Grid gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}>
        {teachValues.map((item, idx) => (
          <TeachValueCard idx={idx} item={item} />
        ))}
      </Grid>
      <Heading mt={10} textAlign={'center'}>
        {t('how_to_begin', { ns: 'instructor' })}
      </Heading>

      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab overflow={'scroll'}>
            {t('how_to_begin_1', { ns: 'instructor' })}
          </Tab>
          <Tab overflow={'scroll'}>
            {t('how_to_begin_2', { ns: 'instructor' })}
          </Tab>
          <Tab overflow={'scroll'}>
            {t('how_to_begin_3', { ns: 'instructor' })}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex
              alignItems={'center'}
              direction={{ base: 'column-reverse', md: 'row' }}
              justifyContent={'center'}
            >
              <Stack w={{ base: '100%', md: '50%' }}>
                <Text>{t('how_to_begin_1_text_1', { ns: 'instructor' })}</Text>
                <Text>{t('how_to_begin_1_text_2', { ns: 'instructor' })}</Text>
                <Text fontWeight={'bold'}>
                  {t('how_we_help_you', { ns: 'instructor' })}
                </Text>
                <Text>{t('how_to_begin_1_text_3', { ns: 'instructor' })}</Text>
              </Stack>
              <Box
                w={{ base: '100%', md: '50%' }}
                display={'flex'}
                justifyContent={'center'}
              >
                <PlanCurriculumIcon />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              alignItems={'center'}
              direction={{ base: 'column-reverse', md: 'row' }}
              justifyContent={'center'}
            >
              <Stack w={{ base: '100%', md: '50%' }}>
                <Text>{t('how_to_begin_2_text_1', { ns: 'instructor' })}</Text>
                <Text>{t('how_to_begin_2_text_2', { ns: 'instructor' })}</Text>
                <Text fontWeight={'bold'}>
                  {t('how_we_help_you', { ns: 'instructor' })}
                </Text>
                <Text>{t('how_to_begin_2_text_3', { ns: 'instructor' })}</Text>
              </Stack>
              <Box
                w={{ base: '100%', md: '50%' }}
                display={'flex'}
                justifyContent={'center'}
              >
                <RecordVideoIcon />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              alignItems={'center'}
              direction={{ base: 'column-reverse', md: 'row' }}
              justifyContent={'center'}
            >
              <Stack w={{ base: '100%', md: '50%' }}>
                <Text>{t('how_to_begin_3_text_1', { ns: 'instructor' })}</Text>
                <Text>{t('how_to_begin_3_text_2', { ns: 'instructor' })}</Text>
                <Text fontWeight={'bold'}>
                  {t('how_we_help_you', { ns: 'instructor' })}
                </Text>
                <Text>{t('how_to_begin_3_text_3', { ns: 'instructor' })}</Text>
              </Stack>
              <Box
                w={{ base: '100%', md: '50%' }}
                display={'flex'}
                justifyContent={'center'}
              >
                <LaunchCourseIcon />
              </Box>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Card>
        <CardBody>
          <Stack textAlign={'center'} w={'500px'} mx={'auto'}>
            <SectionTitle
              title={t('become_instructor_today', { ns: 'instructor' })}
              subtitle={t('become_instructor_today_descritpion', {
                ns: 'instructor',
              })}
            />
            <Button onClick={onOpen} w={'full'} h={14} colorScheme={'facebook'}>
              {t('instructor_page_get_started', { ns: 'instructor' })}
            </Button>
          </Stack>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'2xl'}>
            {t('become_instructor_today', { ns: 'instructor' })}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <Formik
            onSubmit={onSubmit}
            initialValues={InstructorValidation.applyInstructorValue}
            validationSchema={InstructorValidation.applyInstructorValidation}
          >
            <Form>
              <ModalBody>
                <Stack spacing={4}>
                  {(error as string) && (
                    <ErrorAlert
                      title={error as string}
                      clearHandler={clearInstructorError}
                    />
                  )}
                  <Flex flexDirection={{ base: 'column', md: 'row' }} gap={4}>
                    <TextField
                      name={'firstName'}
                      label={t('first_name', { ns: 'global' })}
                      placeholder={'Ali'}
                      type={'text'}
                    />
                    <TextField
                      name={'lastName'}
                      label={t('last_name', { ns: 'global' })}
                      placeholder={'Osman'}
                      type={'text'}
                    />
                  </Flex>
                  <TextField
                    name={'email'}
                    label={t('login_input_email_label', { ns: 'global' })}
                    placeholder={'info@sammi.ac'}
                    type={'email'}
                  />
                  <TextField
                    name={'job'}
                    label={t('job_label', { ns: 'instructor' })}
                    placeholder={'Senior software engineer'}
                  />
                  <SelectField
                    name="language"
                    label={t('language', { ns: 'instructor' })}
                    placeholder="-"
                    arrOptions={courseLng}
                  />
                  <TextField
                    name={'socialMedia'}
                    label={`${t('social_media', { ns: 'global' })} (YouTube)`}
                    placeholder={`${t('link_to_your_lesson', {
                      ns: 'global',
                    })}`}
                    type={'text'}
                  />
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={'facebook'}
                  h={14}
                  rightIcon={<GoVerified />}
                  isLoading={isLoading}
                  loadingText={t('loading', { ns: 'global' })}
                >
                  {t('send_to_verify_btn', { ns: 'global' })}
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

interface TeachValueCardProps {
  idx: number;
  item: {
    title: string;
    description: string;
    icon: FC;
  };
}

const TeachValueCard = ({ item, idx }: TeachValueCardProps) => {
  const { t } = useTranslation();

  return (
    <Stack key={idx} align={'center'} textAlign={'center'} p={4}>
      <Icon as={item.icon} fontSize={100} />
      <Text fontWeight={'bold'} fontSize={20}>
        {t(item.title, { ns: 'instructor' })}
      </Text>
      <Text>{t(item.description, { ns: 'instructor' })}</Text>
    </Stack>
  );
};

export default BecomeInstructorPageComponent;
