import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik, FormikValues } from 'formik';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import { editLessonModules } from 'src/config/editor.config';
import { useActions } from 'src/hooks/useActions';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { LessonType } from 'src/interfaces/instructor.interface';
import {
  CourseValidation,
  manageLessonValues,
} from 'src/validations/course.validation';
import ErrorAlert from '../error-alert/error-alert';
import TextAreaField from '../text-area-field/text-area-field';
import TextField from '../text-field/text-field';
import { LessonFormProps } from './lesson-form.props';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const LessonForm = ({ sectionId, values, onToggle }: LessonFormProps) => {
  const [initialValues, setInitialValues] = useState(manageLessonValues);
  const { createLesson, getSection, clearLessonError, editLesson } =
    useActions();
  const { course } = useTypedSelector((state) => state.instructor);
  const { isLoading, error } = useTypedSelector((state) => state.section);
  const { t } = useTranslation();
  const toast = useToast();

  const onSubmit = (formValues: FormikValues, { resetForm }) => {
    const data = formValues as LessonType;
    if (values) {
      editLesson({
        lessonId: values._id,
        ...data,
        callback: () => {
          toast({
            title:
              t('successfully_edited', { ns: 'instructor' }) ||
              'Successfully edited lesson',
            position: 'top-right',
            isClosable: true,
          });
          onToggle();
          resetForm();
        },
      });
    } else {
      createLesson({
        ...data,
        sectionId,
        callback: () => {
          toast({
            title:
              t('successfully_created_course', { ns: 'instructor' }) ||
              'Successfully created new lesson',
            position: 'top-right',
            isClosable: true,
          });
          onToggle();
          resetForm();
        },
      });
    }
  };

  useEffect(() => {
    if (values?._id) {
      setInitialValues(values);
    }
  }, [values]);

  return (
    <Box
      p={5}
      mt="4"
      border={'1px'}
      borderRadius={'lg'}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
    >
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={CourseValidation.lesson}
        enableReinitialize
      >
        {(formik) => (
          <Form>
            <Stack spacing={5}>
              <>
                {error && (
                  <ErrorAlert
                    title={error as string}
                    clearHandler={clearLessonError}
                  />
                )}
              </>
              <TextField name="name" label="Name" />
              <TextAreaField name="embedVideo" label="Embed video" />
              <Flex gap={3}>
                <TextField name="hour" label="Hour" type="number" />
                <TextField name="minute" label="Minute" type="number" />
                <TextField name="second" label="Second" type="number" />
              </Flex>
              <Box>
                <ReactQuill
                  modules={editLessonModules}
                  onChange={(data) => formik.setFieldValue('material', data)}
                  value={formik.values?.material}
                />
                {formik.errors.material && formik.touched.material && (
                  <Text mt={2} fontSize="14px" color="red.500">
                    {formik.errors.material as string}
                  </Text>
                )}
              </Box>
              <Button
                h={14}
                mt={4}
                w={'full'}
                colorScheme={'facebook'}
                type={'submit'}
                isLoading={isLoading}
                loadingText={`${t('loading', { ns: 'global' })}`}
              >
                {t('account_recovery_btn_form3', { ns: 'global' }) || 'Submit'}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LessonForm;
