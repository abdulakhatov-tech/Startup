import { Icon } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import { useTranslation } from 'react-i18next';

import { sponsorshipCarousel } from 'src/config/carousel';
import { trustedCompeny } from 'src/config/constants';
import SectionTitle from '../section-title/section-title';

const Sponsorship = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle
        title=""
        subtitle={t('sponsor_title', { ns: 'home' })}
        textAlign={'center'}
        mb={5}
      />
      <Carousel
        responsive={sponsorshipCarousel}
        arrows={false}
        showDots={false}
        infinite
        autoPlay={true}
        autoPlaySpeed={1000}
      >
        {trustedCompeny.map((item, idx) => (
          <Icon key={idx} as={item} fontSize={50} />
        ))}
      </Carousel>
    </>
  );
};

export default Sponsorship;
