import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { MdEdit } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import { Form, Formik, FormikValues } from 'formik';
import { useState, ChangeEvent, useEffect } from 'react';

import TextAreaField from 'src/components/text-area-field/text-area-field';
import TextFiled from 'src/components/text-field/text-field';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { FileService } from '@/src/services/file.service';
import { AuthService } from '@/src/services/auth.service';
import { loadImage } from '@/src/helpers/image.helper';
import { useActions } from '@/src/hooks/useActions';

const Settings = () => {
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState<File>();
  const [values, setValues] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useTypedSelector((state) => state.user);
  const toast = useToast();
  const { checkAuth } = useActions();

  const onSubmit = async (formikValues: FormikValues) => {
    setIsLoading(true);
    let avatarUrl: string = user?.avatar as string;
    try {
      if (avatar) {
        const formData = new FormData();
        formData.append('image', avatar);
        const response = await FileService.fileUpload(formData, 'avatar');
        avatarUrl = response.url;
      }
      const data = {
        avatar: avatarUrl,
        ...formikValues,
      };
      const response = await AuthService.updateUser(data);
      if (response) {
        const refreshToken = Cookies.get('refresh');
        if (refreshToken) checkAuth();
        setIsLoading(false);
        toast({
          title: t('your_profile_update_successfully', { ns: 'dashboard' }),
          status: 'success',
          position: 'top-right',
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onFileHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file && file.size > 2081800) {
      toast({
        title: t('image_size_is_big', { ns: 'dashboard' }),
        status: 'error',
      });
      return;
    }

    if (file.type == 'image/jpeg' || file.type == 'image/png') {
      setAvatar(file);
    } else {
      toast({
        title: t('image_type_error', { ns: 'dashboard' }),
        status: 'error',
      });
    }
  };

  const openFile = () => {
    const doc = document.getElementById('file');
    return doc?.click();
  };

  useEffect(() => {
    if (user) {
      const { fullName, job, bio, birthday } = user;
      const full: string[] = fullName?.split(' ') as string[];

      setValues({
        firstName: full?.length ? full[0] : '',
        lastName: full?.length > 1 ? full[1] : '',
        job: job as string,
        bio,
        birthday,
      });
    }
  }, []);

  return (
    <>
      <HStack>
        <Avatar
          src={avatar ? URL.createObjectURL(avatar) : loadImage(user?.avatar)}
          name={user?.fullName}
          backgroundColor={'facebook.500'}
          size={'xl'}
        >
          {avatar ? (
            <AvatarBadge
              as={IconButton}
              size="sm"
              rounded="full"
              top="-10px"
              colorScheme="facebook"
              aria-label="remove Image"
              icon={<AiOutlineClose />}
              onClick={() => setAvatar(undefined)}
            />
          ) : (
            <label htmlFor="">
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="facebook"
                aria-label="remove Image"
                icon={<MdEdit />}
                onClick={openFile}
              />
              <input
                type="file"
                hidden
                accept="image/*"
                id="file"
                onChange={(e) => onFileHandler(e)}
              />
            </label>
          )}
        </Avatar>
        <VStack align={'flex-start'}>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            {user?.fullName}
          </Text>
          <Text>
            <Box fontWeight={'bold'} as={'span'}>
              {t('email', { ns: 'dashboard' })}
            </Box>
            : {user?.email}
          </Text>
        </VStack>
      </HStack>
      <Formik onSubmit={onSubmit} initialValues={values} enableReinitialize>
        <Form>
          <Flex
            gap={{ base: 1, md: 5 }}
            direction={{ base: 'column', md: 'row' }}
          >
            <TextFiled
              name="firstName"
              label={t('first_name', { ns: 'dashboard' })}
              placeholder="Omar"
            />
            <TextFiled
              name="lastName"
              label={t('last_name', { ns: 'dashboard' })}
              placeholder="Osman"
            />
          </Flex>
          <Flex
            gap={{ base: 1, md: 5 }}
            direction={{ base: 'column', md: 'row' }}
          >
            <TextFiled
              name="birthday"
              label={t('date_of_birth', { ns: 'dashboard' })}
              placeholder={`${t('date_of_birth', { ns: 'dashboard' })}`}
              type="date"
            />
            <TextFiled
              name="job"
              label={t('profession', { ns: 'dashboard' })}
              placeholder="Front-End developer"
            />
          </Flex>
          <TextAreaField
            name="bio"
            placeholder={`${t('about_yourself', { ns: 'dashboard' })}`}
            label={`${t('about_yourself', { ns: 'dashboard' })}`}
            height="100"
          />
          <Button
            mt={5}
            h={14}
            w={'full'}
            colorScheme={'facebook'}
            isActive
            type="submit"
            isLoading={isLoading}
          >
            {t('submit', { ns: 'dashboard' })}
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default Settings;

const data = {
  firstName: '',
  lastName: '',
  birthday: '',
  job: '',
  bio: '',
};
