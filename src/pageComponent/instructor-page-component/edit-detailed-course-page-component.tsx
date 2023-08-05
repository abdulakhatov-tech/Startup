import { Divider, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import SectionTitle from 'src/components/section-title/section-title';
import { InstructorManageCourse } from '@/src/components';
import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import { useActions } from '@/src/hooks/useActions';
import { CourseType } from '@/src/interfaces/course.interface';

const EditDetailedCoursePageComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toast = useToast();

  const { course } = useTypedSelector((state) => state.instructor);
  const { editCourse } = useActions();
  const onSubmit = (data: CourseType) => {
    editCourse({
      ...data,
      callback: () => {
        toast({
          title:
            t('successfully_edited', { ns: 'instructor' }) ||
            'Successfully edited',
          position: 'top-right',
          isClosable: true,
        });
        router.push('/instructor/edit-courses');
      },
    });
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
      <InstructorManageCourse
        titleBtn={t('edit_course_title', { ns: 'instructor' }) || 'Edit course'}
        submitHandler={onSubmit}
        courseValues={course}
      />
    </>
  );
};

export default EditDetailedCoursePageComponent;
