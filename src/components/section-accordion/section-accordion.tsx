import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Center,
  Collapse,
  Flex,
  Icon,
  List,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { DragEvent } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useActions } from 'src/hooks/useActions';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import ErrorAlert from '../error-alert/error-alert';
import LessonAccordionItem from '../lesson-accordion-item/lesson-accordion-item';
import LessonForm from '../lesson-form/lesson-form';
import { SectionAccordionProps } from './section-accordion.props';
import { useTranslation } from 'react-i18next';

const SectionAccordion = ({
  section,
  setSectionTitle,
  sectionIdx,
  onOpen,
}: SectionAccordionProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const { deleteSection, clearSectionError, getSection, dragSection } =
    useActions();
  const { error, isLoading, sections } = useTypedSelector(
    (state) => state.section
  );
  const { course } = useTypedSelector((state) => state.instructor);
  const { t } = useTranslation();
  const toast = useToast();

  const onDelete = () => {
    const isAgree = confirm(
      t('is_agree', { ns: 'instructor' }) || 'Are you sure?'
    );

    if (isAgree) {
      deleteSection({
        sectionId: section._id,
        courseId: course?._id,
        callback: () => {
          toast({
            title:
              t('successfully_deleted', { ns: 'instructor' }) ||
              'Successfully deleted',
            position: 'top-right',
            isClosable: true,
          });
        },
      });
    }
  };

  const onEditSection = () => {
    onOpen();
    setSectionTitle({ title: section.title, id: section._id });
  };

  const onDragStartSection = (e: DragEvent<HTMLButtonElement>) => {
    e.dataTransfer.setData('sectionIdx', String(sectionIdx));
  };

  const onDropSection = (e: DragEvent<HTMLButtonElement>) => {
    const movingSectionIndex = Number(e.dataTransfer.getData('sectionIdx'));
    const allSections = [...sections];
    const movingItem = allSections[movingSectionIndex];
    allSections.splice(movingSectionIndex, 1);
    allSections.splice(sectionIdx, 0, movingItem);
    const editedIdx = allSections.map((c) => c._id);
    dragSection({
      sections: editedIdx,
      courseId: course?._id,
      callback: () => {},
    });
  };

  return (
    <AccordionItem>
      <>
        {error && (
          <ErrorAlert
            title={error as string}
            clearHandler={clearSectionError}
          />
        )}
      </>

      <AccordionButton
        h={{ base: 'fit-content', sm: 14 }}
        p={{ base: 0, sm: 2 }}
        py={{ base: 2, sm: 0 }}
        fontWeight={'bold'}
        cursor={isLoading ? 'progress' : 'pointer'}
        draggable
        onDragStart={onDragStartSection}
        onDrop={onDropSection}
      >
        <Flex w={'100%'} align={'center'} justify={'space-between'} gap={2}>
          <Flex align={'center'} gap={2}>
            <Icon
              as={AiOutlineMenu}
              w={{ base: 4, sm: 5 }}
              h={{ base: 4, sm: 5 }}
            />
            <Text
              maxW={{ base: '200px', sm: '100%' }}
              w={'100%'}
              overflowX={'hidden'}
            >
              {section.title}
            </Text>
          </Flex>
          <Flex fontSize={'15px'} align={'center'} gap={{ base: 1, md: 3 }}>
            <Icon
              as={MdEdit}
              w={{ base: 4, sm: 5 }}
              h={{ base: 4, sm: 5 }}
              onClick={onEditSection}
            />
            <Icon
              as={MdDelete}
              w={{ base: 4, sm: 5 }}
              h={{ base: 4, sm: 5 }}
              onClick={onDelete}
            />
            <AccordionIcon />
          </Flex>
        </Flex>
      </AccordionButton>
      <AccordionPanel pb={4}>
        <List onDragOver={(e) => e.preventDefault()}>
          {section.lessons.map((lesson, idx) => (
            <LessonAccordionItem
              key={lesson._id}
              lesson={lesson}
              lessonIdx={idx}
              sectionId={section._id}
            />
          ))}
        </List>
        <Center>
          <Button
            variant={'unstyled'}
            color={'facebook.200'}
            _hover={{ textDecoration: 'underline' }}
            onClick={onToggle}
          >
            {isOpen
              ? t('close_form', { ns: 'instructor' })
              : t('create_lesson', { ns: 'instructor' })}
          </Button>
        </Center>
        <Collapse in={isOpen} animateOpacity>
          <LessonForm sectionId={section._id} onToggle={onToggle} />
        </Collapse>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SectionAccordion;
