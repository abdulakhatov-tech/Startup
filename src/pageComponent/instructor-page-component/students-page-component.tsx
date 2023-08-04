import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Input,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { AiOutlineFieldNumber, AiOutlineReload } from 'react-icons/ai';

import SectionTitle from '@/src/components/section-title/section-title';
import { courseUsers } from '@/src/config/constants';

Chart.register(CategoryScale);

const StudentPageComponent = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({
    labels: courseUsers.map((data) => data.year),
    datasets: [
      {
        label: 'Users Gained ',
        data: courseUsers.map((data) => data.userGain),
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  return (
    <>
      <Card>
        <CardBody>
          <Stack>
            <SectionTitle
              title={t('students_title', { ns: 'instructor' }) || 'Students'}
              subtitle={
                t('students_description', { ns: 'instructor' }) ||
                'Enrolled users to your courses and analytics'
              }
            />
            <Box className="chart-container">
              <Line
                data={chartData}
                options={{
                  plugins: {
                    title: { display: false },
                    legend: { display: false },
                  },
                }}
              />
            </Box>
          </Stack>
        </CardBody>
      </Card>
      <Box mt={10}>
        <Heading>{t('all_users', { ns: 'instructor' }) || 'All users'}</Heading>
        <Box pos={'relative'} mt={5}>
          <Input
            h={14}
            w={'full'}
            bg={'white'}
            color={'gray.900'}
            placeholder={t('search_input_placeholder', { ns: 'courses' }) || ''}
            _placeholder={{ color: 'gray.500' }}
          />
          <Button
            pos={'absolute'}
            right={2}
            top={2}
            colorScheme={'facebook'}
            zIndex={999}
          >
            {t('search_input_btn', { ns: 'courses' })}
          </Button>
        </Box>
        <TableContainer mt={10}>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>
              <Button
                colorScheme={'facebook'}
                variant={'outline'}
                rightIcon={<AiOutlineReload />}
              >
                {t('more', { ns: 'instructor' }) || 'more'}...
              </Button>
            </TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>
                  <AiOutlineFieldNumber fontSize={20} />
                </Th>
                <Th>{t('email', { ns: 'instructor' }) || 'Email'}</Th>
                <Th>{t('full_name', { ns: 'instructor' }) || 'FullName'}</Th>
                <Th>{t('courses', { ns: 'instructor' }) || 'Courses'}</Th>
                <Th>
                  {t('enrolled_date', { ns: 'instructor' }) || 'Enrolled date'}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {courseUsers.map((user, idx) => (
                <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.fullName}</Td>
                  <Td>{2 * idx + 3}</Td>
                  <Td>{user.year}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default StudentPageComponent;
