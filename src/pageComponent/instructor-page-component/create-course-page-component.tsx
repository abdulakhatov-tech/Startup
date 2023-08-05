import { Divider, useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { InstructorManageCourse } from '@/src/components';
import SectionTitle from '@/src/components/section-title/section-title';
import { SubmitValuesInterface } from '@/src/components/instructor-manage-course/instructor-manage-course.props';
import { useActions } from '@/src/hooks/useActions';
import { useRouter } from 'next/router';

const CreateCoursePageComponent = () => {
  const { t } = useTranslation();
  const { createCourse } = useActions();
  const toast = useToast();
  const router = useRouter();

  const onSubmit = (data: SubmitValuesInterface) => {
    createCourse({
      ...data,
      callback: () => {
        toast({
          title: t('successfully_created_course', { ns: 'instructor' }),
          description: t('successfully_created_course_description', {
            ns: 'instructor',
          }),
          position: 'top-right',
          isClosable: true,
        });
        router.push('/instructor/courses');
      },
    });

    console.log(data);
  };

  return (
    <>
      <SectionTitle
        title={
          t('create_course_title', { ns: 'instructor' }) || 'Create course'
        }
        subtitle={
          t('create_course_description', { ns: 'instructor' }) ||
          "Note that when you're creating course it will be draft"
        }
      />
      <Divider mt={5} />
      <InstructorManageCourse
        titleBtn={
          t('create_course_btn', { ns: 'instructor' }) || 'Create course'
        }
        submitHandler={onSubmit}
      />
    </>
  );
};

export default CreateCoursePageComponent;
