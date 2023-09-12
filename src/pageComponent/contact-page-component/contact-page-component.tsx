import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Formik, FormikValues } from 'formik';

import { TextAreaField } from '@/src/components';
import TextField from '@/src/components/text-field/text-field';
import SectionTitle from 'src/components/section-title/section-title';
import axios from 'axios';
import { API_URL, getMailUrl } from '@/src/config/api.config';

const ContactPageComponent = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmit = (formikValues: FormikValues) => {
    try {
      setIsLoading(true);
      axios.post(`${API_URL}${getMailUrl('contact-us')}`, formikValues);
      toast({ title: 'Successfully', position: 'top-right' });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      h={'90vh'}
      justify={'flex-start'}
      direction={{ base: 'column', lg: 'row' }}
      align={'center'}
      gap={'4'}
    >
      <SectionTitle
        w={{ base: '100%', lg: '40%' }}
        title={t('contact_title', { ns: 'global' })}
        subtitle={t('contact_description', { ns: 'global' })}
      />
      <Card w={{ base: '100%', lg: '60%' }}>
        <CardBody>
          <Heading fontSize={'2xl'}>
            {t('contact_heading', { ns: 'global' })}
          </Heading>
          <Text fontSize={'lg'} mt={4}>
            {t('contact_text', { ns: 'global' })}
          </Text>
          <Formik
            onSubmit={onSubmit}
            initialValues={{ email: '', name: '', message: '' }}
          >
            <Form>
              <Stack spacing={4} mt={5}>
                <TextField
                  name="name"
                  label={t('contact_name', { ns: 'global' })}
                  placeholder="Omar"
                />
                <TextField
                  name="email"
                  label={t('contact_email', { ns: 'global' })}
                  placeholder="education@gmail.com"
                />

                <TextAreaField
                  name="message"
                  label={t('contact_message', { ns: 'global' }) as string}
                  placeholder="Message"
                  height={'150px'}
                />

                <Button
                  w={'full'}
                  h={14}
                  colorScheme={'facebook'}
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {t('contact_btn', { ns: 'global' })}
                </Button>
              </Stack>
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default ContactPageComponent;
