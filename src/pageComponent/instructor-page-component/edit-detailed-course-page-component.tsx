import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { TagsInput } from 'react-tag-input-component';
import { useTranslation } from 'react-i18next';

import { GiSave } from 'react-icons/gi';

import 'react-quill/dist/quill.snow.css';
import SectionTitle from 'src/components/section-title/section-title';
import { courseCategory, courseLevel, coursePrice } from 'src/config/constants';
import { editorModules } from 'src/config/editor.config';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EditDetailedCoursePageComponent = () => {
  const { t } = useTranslation();
  const [learned, setLearned] = useState<string[]>();
  const [requirements, setRequirements] = useState<string[]>();
  const [tags, setTags] = useState<string[]>();
  const [file, setFile] = useState(null);

  const router = useRouter();

  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <>
      <SectionTitle
        title={`${
          t('edit_course_title', { ns: 'instructor' }) || 'Edit course'
        }: ${router.query.slug}`}
        subtitle={''}
      />
      <Divider mt={5} />
      <Flex mt={12} gap={4}>
        <Box w="70%">
          <Stack spacing={5}>
            <FormControl isRequired>
              <FormLabel>
                {t('title', { ns: 'instructor' }) || 'Title'}
              </FormLabel>
              <Input
                type="text"
                h={14}
                placeholder="JavaScript from zero to hero"
                colorScheme="facebook"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>
                {t('excerpt', { ns: 'instructor' }) || 'Excerpt'}
              </FormLabel>
              <Textarea h={165} placeholder="Full course about JavaScript" />
            </FormControl>
            <Flex gap={4}>
              <Box w={'full'}>
                <FormLabel>
                  {t('what_students_will_learn', { ns: 'instructor' }) ||
                    'What will students learn in your course?'}{' '}
                  <Box as="span" color={'red.300'}>
                    *
                  </Box>
                </FormLabel>
                <TagsInput
                  value={learned}
                  onChange={setLearned}
                  name="learn"
                  placeHolder="Full project..."
                />
              </Box>
              <Box w={'full'}>
                <FormLabel>
                  {t('requirements', { ns: 'instructor' }) || 'Requirements'}{' '}
                  <Box as={'span'} color={'red.300'}>
                    *
                  </Box>
                </FormLabel>
                <TagsInput
                  value={requirements}
                  onChange={setRequirements}
                  name="requirements"
                  placeHolder="Basic JavaScript..."
                />
              </Box>
            </Flex>
            <Box>
              <FormLabel>
                {t('description', { ns: 'instructor' }) || 'Description'}{' '}
                <Box as={'span'} color={'red.300'}>
                  *
                </Box>
              </FormLabel>
              <ReactQuill modules={editorModules} />
            </Box>

            <Button
              w={'full'}
              h={14}
              colorScheme={'facebook'}
              rightIcon={<GiSave />}
            >
              {t('edit_course_title', { ns: 'instructor' }) || 'Edit course'}
            </Button>
          </Stack>
        </Box>
        <Box w="30%">
          <Stack spacing={5}>
            <FormControl isRequired>
              <FormLabel>
                {t('level', { ns: 'instructor' }) || 'Level'}
              </FormLabel>
              <Select
                borderRadius={'8px'}
                placeholder={'-'}
                height={14}
                focusBorderColor={'green.500'}
              >
                {courseLevel.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>
                {t('category', { ns: 'instructor' }) || 'Category'}
              </FormLabel>
              <Select
                borderRadius={'8px'}
                placeholder={'-'}
                height={14}
                focusBorderColor={'green.500'}
              >
                {courseCategory.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>
                {t('price', { ns: 'instructor' }) || 'Price'}
              </FormLabel>
              <Select
                borderRadius={'8px'}
                height={14}
                focusBorderColor={'green.500'}
              >
                {coursePrice.map((option) => (
                  <option key={option} value={option}>
                    {option.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Box>
              <FormLabel>
                {t('course_tags', { ns: 'instructor' }) || 'Course tags'}{' '}
                <Box as={'span'} color={'red.300'}>
                  *
                </Box>
              </FormLabel>
              <TagsInput
                value={tags}
                onChange={setTags}
                name="tags"
                placeHolder="JavaScript..."
              />
            </Box>
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
    </>
  );
};

export default EditDetailedCoursePageComponent;
