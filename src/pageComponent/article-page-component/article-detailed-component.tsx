import {
  Avatar,
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { useSpeechSynthesis } from 'react-speech-kit';

import { ArticleDetailedProps } from './article-page-component.props';
import { calculateEstimatedReadingTime } from '@/src/helpers/time.helper';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { voiceLanguages } from '@/src/config/constants';
import { AiFillPlayCircle } from 'react-icons/ai';
import { BsFillStopCircleFill } from 'react-icons/bs';

const ArticleDetailedComponent = ({ article }: ArticleDetailedProps) => {
  const [myVoice, setMyVoice] = useState();

  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter();

  const onEnd = () => {
    toast({
      title: 'The End',
      status: 'info',
      position: 'top-right',
      isClosable: true,
    });
  };

  const { speak, voices, cancel, speaking, supported } = useSpeechSynthesis({
    onEnd,
  });

  useEffect(() => {
    const lng = Cookies.get('i18next');
    const currentLanguage = voiceLanguages?.find(
      (item) => item.language === lng
    );
    const supportLanguage = voiceLanguages?.map((c) => c?.voiceUrl);
    const allSupportVoices = voices?.filter((item) =>
      supportLanguage.includes(item?.voiceURI)
    );
    const currentVoice = allSupportVoices.find(
      (item) => item.lang === currentLanguage?.codes
    );

    setMyVoice(currentVoice);
  }, [voices, router]);

  return (
    <>
      <Card>
        <CardBody>
          <Box
            w={'full'}
            h={{ base: '30vh', lg: '50vh' }}
            backgroundImage={`url(${article?.image?.url})`}
            backgroundPosition={'center'}
            backgroundSize={'cover'}
            backgroundRepeat={'no-repeat'}
            pos={'relative'}
          >
            <Box
              pos={'absolute'}
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg={'rgba(0, 0, 0, .5)'}
            />
            <Stack
              justify={'center'}
              spacing={3}
              w={{ base: '100%', lg: '70%' }}
              pl={{ base: 2, lg: 10 }}
              pos={'relative'}
              h={'full'}
            >
              <Heading fontSize={{ base: '16px', md: '24px', lg: '28px' }}>
                {article?.title}
              </Heading>
              <Text fontSize={{ base: '12px', md: '18px', lg: '22px' }}>
                {article?.excerpt}
              </Text>
              <HStack>
                <Avatar src={article?.author?.avatar?.url} />
                <Box>
                  <Text>{article?.author?.name}</Text>
                  <Text color={'gray.500'}>
                    {format(new Date(article?.createdAt), 'dd MMM, yyyy')} ·{' '}
                    {calculateEstimatedReadingTime(article?.description?.text)}
                    {t('read_article', { ns: 'layout' })}
                  </Text>
                </Box>
              </HStack>
            </Stack>
          </Box>
        </CardBody>
      </Card>

      {supported && myVoice && (
        <Box
          my={5}
          position={'relative'}
          cursor={'pointer'}
          border={'1px'}
          w={'200px'}
          p={1}
          borderRadius={'lg'}
          maxH={'200px'}
          borderColor={'gray'}
        >
          {!speaking ? (
            <HStack
              onClick={() => {
                speak({
                  text: `${t('start_reading_article', { ns: 'global' })} ${
                    article.title
                  } ${t('article', { ns: 'global' })}. ${
                    article.description.text
                  }`,
                  voice: myVoice,
                });
              }}
            >
              <Icon as={AiFillPlayCircle} w={10} h={10} />
              <Text>{t('play', { ns: 'global' })}</Text>
            </HStack>
          ) : (
            <HStack onClick={cancel}>
              <Icon as={BsFillStopCircleFill} w={10} h={10} />
              <Text>{t('stop', { ns: 'global' })}</Text>
              {speaking && (
                <Image
                  src="/images/wave.gif"
                  alt="wave"
                  pos={'absolute'}
                  width={'50%'}
                  right={0}
                />
              )}
            </HStack>
          )}
        </Box>
      )}

      <Box>
        <RichText
          content={article.description.raw}
          renderers={{
            h1: ({ children }) => (
              <Heading as={'h1'} mt={2}>
                {children}
              </Heading>
            ),
            h2: ({ children }) => (
              <Heading as={'h2'} mt={2}>
                {children}
              </Heading>
            ),
            h3: ({ children }) => <Heading as={'h3'}>{children}</Heading>,
            h4: ({ children }) => <Heading as={'h4'}>{children}</Heading>,
            h5: ({ children }) => <Heading as={'h5'}>{children}</Heading>,
            bold: ({ children }) => <Text fontWeight={'bold'}>{children}</Text>,
            p: ({ children }) => <Text my={4}>{children}</Text>,
            img: (children) => (
              <Image
                src={children.src}
                alt={children.altText}
                width={children.width}
                height={children.height}
              />
            ),
            a: (children) => <Image src={children.href} alt={children.title} />,
          }}
        />
      </Box>
    </>
  );
};

export default ArticleDetailedComponent;
