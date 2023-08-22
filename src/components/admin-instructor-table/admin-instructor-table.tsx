import {
  Button,
  ButtonGroup,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AiOutlineFieldNumber, AiOutlineReload } from 'react-icons/ai';
import { AdminInstructorTableProps } from './admin-instructor-table.props';
import { FC } from 'react';
import { useRouter } from 'next/router';
import {
  approveInstructor,
  deleteInstructor,
} from '@/src/store/admin/admin.action';
import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import { useActions } from '@/src/hooks/useActions';
import ErrorAlert from '../error-alert/error-alert';

const AdminInstructorTable: FC<AdminInstructorTableProps> = ({
  instructors,
  approved,
}): JSX.Element => {
  const { approveInstructor, deleteInstructor, clearAdminError } = useActions();
  const { isLoading, error } = useTypedSelector((state) => state.admin);
  const { t } = useTranslation();
  const router = useRouter();
  const toast = useToast();

  const approveInstructorHandler = (instructorId: string) => {
    approveInstructor({
      instructorId,
      callback: () => {
        router.replace(router.asPath);
        toast({
          title:
            t('successfully_approve', { ns: 'admin' }) ||
            'Successfully approve',
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });
      },
    });
  };

  const deleteInstructorHandler = (instructorId: string) => {
    deleteInstructor({
      instructorId,
      callback: () => {
        router.replace(router.asPath);
        toast({
          title:
            t('successfully_deleted', { ns: 'instructor' }) ||
            'Successfully deleted',
          status: 'info',
          position: 'top-right',
          isClosable: true,
        });
      },
    });
  };

  return (
    <>
      <>
        {error && (
          <ErrorAlert title={error as string} clearHandler={clearAdminError} />
        )}
      </>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>
            <Button
              colorScheme={'facebook'}
              variant={'outline'}
              rightIcon={<AiOutlineReload />}
            >
              {t('more', { ns: 'instructor' }) || 'More'}...
            </Button>
          </TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>
                <AiOutlineFieldNumber fontSize={20} />
              </Th>
              <Th>{t('email', { ns: 'admin' }) || 'Email'}</Th>
              <Th>{t('full_name', { ns: 'admin' }) || 'FullName'}</Th>
              <Th>{t('job', { ns: 'admin' }) || 'Job'}</Th>
              <Th>{t('social_media', { ns: 'admin' }) || 'Social media'}</Th>
              <Th>{t('actions', { ns: 'admin' }) || 'Actions'}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {instructors.map((instructor, idx) => (
              <Tr key={idx}>
                <Td>{idx + 1}</Td>
                <Td>{instructor.author.email}</Td>
                <Td>{instructor.author.fullName}</Td>
                <Td>{instructor.author.job}</Td>
                <Td>{instructor.socialMedia}</Td>
                <Td>
                  <ButtonGroup variant="outline">
                    {approved ? (
                      <Button
                        isLoading={isLoading}
                        size={'sm'}
                        colorScheme={'red'}
                        onClick={() => deleteInstructorHandler(instructor._id)}
                      >
                        {t('del', { ns: 'admin' }) || 'Del'}
                      </Button>
                    ) : (
                      <Button
                        size={'sm'}
                        colorScheme="facebook"
                        isLoading={isLoading}
                        onClick={() => approveInstructorHandler(instructor._id)}
                      >
                        {t('appr', { ns: 'admin' }) || 'Appr'}
                      </Button>
                    )}
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminInstructorTable;
