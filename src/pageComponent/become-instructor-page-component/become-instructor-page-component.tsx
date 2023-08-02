import SectionTitle from '@/src/components/section-title/section-title';
import { teachValues } from '@/src/config/constants';
import {
  Button,
  Card,
  CardBody,
  Grid,
  HStack,
  Heading,
  Image,
  Stack,
} from '@chakra-ui/react';
import React from 'react';

const BecomeInstructorPageComponent = () => {
  return (
    <Stack spacing={5}>
      <Card>
        <CardBody p={0}>
          <HStack>
            <Stack px={5}>
              <SectionTitle
                textAlign={'center'}
                title="Come to teach us"
                subtitle="Become instructor and change lives - including your own"
              />
              <Button h={14} colorScheme="facebook">
                Get Started
              </Button>
            </Stack>
            <Image src="/images/instructor.png" alt="instructor" />
          </HStack>
        </CardBody>
      </Card>
      <Heading mt={10} textAlign={'center'}>
        So many reasons to start
      </Heading>
      <Grid gridTemplateColumns={'1fr 1fr 1fr'}>
        {/* {teachValues.map((item, idx) => (
					<TeachValueCard idx={idx} item={item} />
				))} */}
      </Grid>
    </Stack>
  );
};

export default BecomeInstructorPageComponent;
