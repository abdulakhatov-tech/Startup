import { InstructorEditCoursesCard } from '@/src/components';
import SectionTitle from '@/src/components/section-title/section-title';
import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import { Grid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const EditCoursesPageComponent = () => {
  const { t } = useTranslation();
  const { courses } = useTypedSelector((state) => state.instructor);

  return (
    <>
      <SectionTitle
        title={t('edit_course_title', { ns: 'instructor' }) || 'Edit courses'}
        subtitle={
          t('edit_course_description', { ns: 'instructor' }) ||
          'Managing courses and create curriculum for your courses'
        }
      />
      <Grid gridTemplateColumns={'1fr 1fr'} gap={4}>
        {courses.map((item) => (
          <InstructorEditCoursesCard key={item.slug} item={item} />
        ))}
      </Grid>
    </>
  );
};

export default EditCoursesPageComponent;
