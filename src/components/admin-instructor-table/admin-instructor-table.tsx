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
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AiOutlineFieldNumber, AiOutlineReload } from 'react-icons/ai';
import { instructorUsers } from 'src/config/constants';

const AdminInstructorTable = () => {
  const { t } = useTranslation();

  return (
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
          {instructorUsers.map((user, idx) => (
            <Tr key={idx}>
              <Td>{idx + 1}</Td>
              <Td>{user.email}</Td>
              <Td>{user.fullName}</Td>
              <Td>{user.job}</Td>
              <Td>{user.socialMedia}</Td>
              <Td>
                <ButtonGroup variant="outline">
                  <Button size={'sm'} colorScheme="facebook">
                    {t('appr', { ns: 'admin' }) || 'Appr'}
                  </Button>
                  <Button size={'sm'} colorScheme={'red'}>
                    {t('del', { ns: 'admin' }) || 'Del'}
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AdminInstructorTable;
