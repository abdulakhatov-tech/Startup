import {
  Flex,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Fragment } from 'react';

import {
  FinishRightIcon,
  OnlineCourseIcon,
  OnlineLearningIcon,
  OnlineStudentIcon,
  RightLineIcon,
} from 'src/icons';
import SectionTitle from '../section-title/section-title';

const HowItWorks = () => {
  const backgroundColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <SectionTitle
        textAlign={'center'}
        title="How it works?"
        subtitle="10,000+ unique online course list designs"
      />

      <SimpleGrid mt={10} columns={5} spacing={10} alignItems={'center'}>
        {data?.map((item, index) => {
          const odd = index % 2;
          return (
            <Fragment key={index}>
              {!odd ? (
                <Stack justify={'center'} align={'center'}>
                  <Flex
                    w={100}
                    h={100}
                    justify={'center'}
                    align={'center'}
                    backgroundColor={backgroundColor}
                    borderRadius={'full'}
                  >
                    {item.icon}
                  </Flex>
                  <Text textAlign={'center'}>{item.title}</Text>
                </Stack>
              ) : (
                <Stack justify={'center'}>{item.icon}</Stack>
              )}
            </Fragment>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default HowItWorks;

const data = [
  { title: 'Signup Platform', icon: <OnlineCourseIcon /> },
  { icon: <RightLineIcon /> },
  { title: 'Find Courses', icon: <OnlineLearningIcon /> },
  { icon: <FinishRightIcon /> },
  { title: 'Learn Relaxing', icon: <OnlineStudentIcon /> },
];
