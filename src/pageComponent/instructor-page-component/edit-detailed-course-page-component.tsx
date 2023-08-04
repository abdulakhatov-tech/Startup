import { Divider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import SectionTitle from 'src/components/section-title/section-title';
import { InstructorManageCourse } from '@/src/components';
import { SubmitValuesInterface } from '@/src/components/instructor-manage-course/instructor-manage-course.props';

const EditDetailedCoursePageComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const onSubmit = (data: SubmitValuesInterface) => {
    console.log(data);
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
      />
    </>
  );
};

export default EditDetailedCoursePageComponent;
