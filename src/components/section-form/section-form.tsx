import { Button } from '@chakra-ui/react';
import { Form, Formik, FormikValues } from 'formik';
import TextField from '../text-field/text-field';

const SectionForm = () => {
  const onSubmit = (formValues: FormikValues) => {
    console.log(formValues);
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={{ title: '' }}>
      <Form>
        <TextField name="title" label="Title" />
        <Button
          h={14}
          mt={4}
          w={'full'}
          colorScheme={'facebook'}
          type={'submit'}
        >
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default SectionForm;
