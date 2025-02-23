import Carousel from 'react-multi-carousel';
import { useTranslation } from 'react-i18next';
import { Box, Icon, Text, useColorModeValue } from '@chakra-ui/react';

import SectionTitle from '../section-title/section-title';
import { categoryCarousel } from '@/src/config/carousel';
import { categories } from '@/src/config/constants';

const Categories = () => {
  const { t } = useTranslation();
  const backgroundColor = useColorModeValue('gray.100', 'gray.900');
  const fill = useColorModeValue('#020288', 'gray.600');

  return (
    <>
      <SectionTitle
        title={t('category_title', { ns: 'home' })}
        subtitle={t('category_description', { ns: 'home' })}
      />
      <Carousel
        responsive={categoryCarousel}
        showDots={false}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={2000}
        infinite
      >
        {categories?.map((item) => (
          <Box
            key={item?.id}
            minH={'200px'}
            mx={2}
            backgroundColor={backgroundColor}
            textAlign={'center'}
            p={5}
            borderRadius={'lg'}
            cursor={'pointer'}
          >
            <Icon as={item?.icon} w={20} h={20} fill={fill} />
            <Text mt={2} fontSize={'lg'}>
              {t(item?.name, { ns: 'home' })}
            </Text>
          </Box>
        ))}
      </Carousel>
    </>
  );
};

export default Categories;
