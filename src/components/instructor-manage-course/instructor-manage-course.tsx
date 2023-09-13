import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { Form, Formik, FormikValues } from 'formik';
import { FileUploader } from 'react-drag-drop-files';
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

import { GiSave } from 'react-icons/gi';

import {
  courseCategory,
  courseLevel,
  courseLng,
  coursePrice,
} from '@/src/config/constants';
import {
  CourseValidation,
  manageCourseValues,
} from '@/src/validations/course.validation';
import { InstructorManageCourseProps } from './instructor-manage-course.props';
import TagField from '../tag-field/tag-field';
import TextField from '../text-field/text-field';
import SelectField from '../select-field/select-field';
import { editorModules } from 'src/config/editor.config';
import TextAreaField from '../text-area-field/text-area-field';
import { FileService } from '@/src/services/file.service';
import { useActions } from '@/src/hooks/useActions';
import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import ErrorAlert from '../error-alert/error-alert';
import Image from 'next/image';
import { loadImage } from '@/src/helpers/image.helper';
import { FaTimes } from 'react-icons/fa';
import { CourseType } from '@/src/interfaces/course.interface';

const InstructorManageCourse = ({
  submitHandler,
  titleBtn,
  courseValues,
}: InstructorManageCourseProps) => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | string | null>();
  const [errorFile, setErrorFile] = useState('');
  const [initialValues, setInitialValues] = useState(manageCourseValues);

  const { error, isLoading } = useTypedSelector((state) => state.course);
  const { clearCourseError, startLoading } = useActions();

  const handleChange = (file: File) => {
    setFile(file);
  };

  const onSubmit = async (formValues: FormikValues) => {
    if (!file) {
      setErrorFile('Preview image is required');
      return;
    }
    let imageUrl = file;
    if (typeof file !== 'string') {
      startLoading();
      const formData = new FormData();
      formData.append('image', file as File);
      const response = await FileService.fileUpload(formData, 'preview-image');
      imageUrl = response.url;
    }
    const data = {
      ...formValues,
      previewImage: imageUrl,
    } as CourseType;
    submitHandler(data);
  };

  useEffect(() => {
    if (courseValues) {
      setInitialValues(courseValues);
      setFile(courseValues.previewImage);
    }
  }, [courseValues]);

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={CourseValidation.create()}
        enableReinitialize
      >
        {(formik) => (
          <Form>
            <Flex
              mt={12}
              gap={4}
              direction={{ base: 'column-reverse', md: 'row' }}
              alignItems={{ base: 'center' }}
            >
              <Box w={{ base: '100%', md: '65%' }}>
                <Stack spacing={5}>
                  <TextField
                    name="title"
                    label={t('title', { ns: 'instructor' }) || 'Title'}
                    placeholder=""
                  />
                  <TextAreaField
                    name="excerpt"
                    placeholder=""
                    height={'180px'}
                    label={t('excerpt', { ns: 'instructor' }) || 'Excerpt'}
                  />
                  <TagField
                    name="learn"
                    placeholder=""
                    formik={formik}
                    values={formik.values.learn}
                    label={
                      t('what_students_will_learn', { ns: 'instructor' }) ||
                      'What will students learn in your course?'
                    }
                    errorMessage={
                      formik.touched.learn
                        ? (formik.errors.learn as string)
                        : ''
                    }
                  />
                  <TagField
                    name="requirements"
                    placeholder=""
                    formik={formik}
                    values={formik.values.requirements}
                    label={
                      t('requirements', { ns: 'instructor' }) || 'Requirements'
                    }
                    errorMessage={
                      formik.touched.requirements
                        ? (formik.errors.requirements as string)
                        : ''
                    }
                  />
                  <TagField
                    name="tags"
                    placeholder="JavaScript..."
                    formik={formik}
                    values={formik.values.tags}
                    label={
                      t('course_tags', { ns: 'instructor' }) || 'Course tags'
                    }
                    errorMessage={
                      formik.touched.tags ? (formik.errors.tags as string) : ''
                    }
                  />
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
                  <>
                    {error && (
                      <ErrorAlert
                        title={error as string}
                        clearHandler={clearCourseError}
                      />
                    )}
                  </>
                  <Button
                    type="submit"
                    w={'full'}
                    h={14}
                    colorScheme={'facebook'}
                    rightIcon={<GiSave />}
                    isLoading={isLoading}
                    loadingText={`${t('loading', { ns: 'global' })}`}
                  >
                    {titleBtn}
                  </Button>
                </Stack>
              </Box>
              <Box w={{ base: '100%', md: '35%' }}>
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
                  <SelectField
                    name="language"
                    placeholder="-"
                    arrOptions={courseLng}
                    label={t('language', { ns: 'instructor' }) || 'Language'}
                  />
                  <FormLabel>
                    {t('course_preview_image', { ns: 'instructor' }) ||
                      'Course preview image'}{' '}
                    <Box as={'span'} color={'red.300'}>
                      *
                    </Box>
                  </FormLabel>
                  {file ? (
                    <Box pos={'relative'} w={'full'} h={200}>
                      <Image
                        src={
                          typeof file === 'string'
                            ? loadImage(file as string)
                            : URL.createObjectURL(file)
                        }
                        alt={courseValues?.title as string}
                        fill
                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <Icon
                        as={FaTimes}
                        fontSize={20}
                        pos={'absolute'}
                        right={2}
                        top={2}
                        cursor={'pointer'}
                        onClick={() => setFile(null)}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <FileUploader
                        handleChange={handleChange}
                        name="file"
                        types={['JPG', 'PNG', 'GIF']}
                        style={{ minWidth: '100%' }}
                      />
                      {errorFile && (
                        <Text mt={2} fontSize="14px" color="red.500">
                          {errorFile}
                        </Text>
                      )}
                    </Box>
                  )}
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
