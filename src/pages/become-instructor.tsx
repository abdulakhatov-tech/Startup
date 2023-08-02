import React from 'react';
import { withLayout } from '../layouts/layout';
import { BecomeInstructorPageComponent } from '../pageComponent';
import { NextPage } from 'next';

const BecomeInstructor: NextPage = () => {
  return <BecomeInstructorPageComponent />;
};

export default withLayout(BecomeInstructor);
