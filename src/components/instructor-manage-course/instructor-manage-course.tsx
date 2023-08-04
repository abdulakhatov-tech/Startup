import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { Form, Formik, FormikValues } from 'formik';
import { FileUploader } from 'react-drag-drop-files';
import { Box, Button, Flex, FormLabel, Stack, Text } from '@chakra-ui/react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

import { GiSave } from 'react-icons/gi';

import {
  courseCategory,
  courseLevel,
  coursePrice,
} from '@/src/config/constants';
import {
  CourseValidation,
  manageCourseValues,
} from '@/src/validations/course.validation';
import {
  InstructorManageCourseProps,
  SubmitValuesInterface,
} from './instructor-manage-course.props';
import TagField from '../tag-field/tag-field';
import TextField from '../text-field/text-field';
import SelectField from '../select-field/select-field';
import { editorModules } from 'src/config/editor.config';
import TextAreaField from '../text-area-field/text-area-field';

const InstructorManageCourse = ({
  submitHandler,
  titleBtn,
}: InstructorManageCourseProps) => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File>();

  const handleChange = (file: File) => {
    setFile(file);
  };

  const onSubmit = (formData: FormikValues) => {
    const data = formData as SubmitValuesInterface;
    submitHandler(data);
  };

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        initialValues={manageCourseValues}
        validationSchema={CourseValidation.create()}
      >
        {(formik) => (
          <Form>
            <Flex mt={12} gap={4}>
              <Box w="70%">
                <Stack spacing={5}>
                  <TextField
                    name="title"
                    label={t('title', { ns: 'instructor' }) || 'Title'}
                    placeholder="JavaScript from zero to hero"
                  />
                  <TextAreaField
                    name="excert"
                    placeholder="Full course about JavaScript"
                    height={'180px'}
                    label={t('excerpt', { ns: 'instructor' }) || 'Excerpt'}
                  />
                  <Flex gap={4}>
                    <TagField
                      name="learn"
                      placeholder="Full project..."
                      formik={formik}
                      label={
                        t('what_students_will_learn', { ns: 'instructor' }) ||
                        'What will students learn in your course?'
                      }
                      errorMessage={formik.errors.learn as string}
                    />

                    <TagField
                      name="requirements"
                      placeholder="Basic JavaScript..."
                      formik={formik}
                      label={
                        t('requirements', { ns: 'instructor' }) ||
                        'Requirements'
                      }
                      errorMessage={formik.errors.requirements as string}
                    />
                  </Flex>
                  <Box>
                    <FormLabel>
                      {t('description', { ns: 'instructor' }) || 'Description'}{' '}
                      <Box as={'span'} color={'red.300'}>
                        *
                      </Box>
                    </FormLabel>
                    <ReactQuill
                      modules={editorModules}
                      onChange={(data) =>
                        formik.setFieldValue('description', data)
                      }
                      value={formik.values.description}
                    />
                    {formik.errors.description && (
                      <Text mt={2} fontSize="14px" color="red.500">
                        {formik.errors.description as string}
                      </Text>
                    )}
                  </Box>

                  <Button
                    type="submit"
                    w={'full'}
                    h={14}
                    colorScheme={'facebook'}
                    rightIcon={<GiSave />}
                  >
                    {titleBtn}
                  </Button>
                </Stack>
              </Box>
              <Box w="30%">
                <Stack spacing={5}>
                  <SelectField
                    name="level"
                    placeholder="-"
                    arrOptions={courseLevel}
                    label={t('level', { ns: 'instructor' }) || 'Level'}
                  />
                  <SelectField
                    name="category"
                    placeholder="-"
                    arrOptions={courseCategory}
                    label={t('category', { ns: 'instructor' }) || 'Category'}
                  />
                  <SelectField
                    name="price"
                    placeholder="-"
                    arrOptions={coursePrice}
                    label={t('price', { ns: 'instructor' }) || 'Price'}
                  />
                  <TagField
                    name="tags"
                    placeholder="JavaScript..."
                    formik={formik}
                    label={
                      t('course_tags', { ns: 'instructor' }) || 'Course tags'
                    }
                    errorMessage={formik.errors.tags as string}
                  />
                  <Box>
                    <FormLabel>
                      {t('course_preview_image', { ns: 'instructor' }) ||
                        'Course preview image'}{' '}
                      <Box as={'span'} color={'red.300'}>
                        *
                      </Box>
                    </FormLabel>
                    <FileUploader
                      handleChange={handleChange}
                      name="file"
                      types={['JPG', 'PNG', 'GIF']}
                      style={{ minWidth: '100%' }}
                    />
                  </Box>
                </Stack>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default InstructorManageCourse;
