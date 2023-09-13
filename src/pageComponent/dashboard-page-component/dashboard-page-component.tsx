import {
  Card,
  CardBody,
  Center,
  Spinner,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { CardType } from 'src/interfaces/constants.interface';
import { CourseType } from 'src/interfaces/course.interface';
import { TransactionsType } from 'src/interfaces/user.interface';
import { AuthService } from 'src/services/auth.service';
import Account from './account';
import DangerZone from './danger-zone';
import MyCourses from './my-courses';
import SavedCards from './saved-cards';
import Settings from './settings';
import Transactions from './transactions';
import { useTranslation } from 'react-i18next';

const DashboardPageComponent = () => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = useTypedSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionsType[]>([]);
  const [myCourses, setMyCourses] = useState<CourseType[]>([]);
  const [savedCards, setSavedCards] = useState<CardType[]>([]);

  const tabHandler = async (idx: number) => {
    setIsLoading(true);
    setTabIndex(idx);
    try {
      if (idx == 2 && !transactions.length) {
        const response = await AuthService.getTransactions();
        setTransactions(response);
      } else if (idx == 3 && !myCourses.length) {
        const response = await AuthService.getMyCourses();
        setMyCourses(response);
      } else if (idx == 4 && !savedCards.length) {
        const response = await AuthService.getSavedCards();
        setSavedCards(response);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          <Tabs
            isFitted
            variant="enclosed-colored"
            colorScheme={'facebook'}
            orientation={'horizontal'}
            onChange={tabHandler}
            defaultValue={tabIndex}
          >
            <TabList mb="1em" h={'auto'} display="flex" flexWrap={'wrap'}>
              <Tab fontSize={{ base: '12px', sm: '14px', md: '16px' }}>
                {t('account', { ns: 'dashboard' })}
              </Tab>
              <Tab fontSize={{ base: '12px', sm: '14px', md: '16px' }}>
                {t('settings', { ns: 'dashboard' })}
              </Tab>
              <Tab fontSize={{ base: '12px', sm: '14px', md: '16px' }}>
                {t('transactions', { ns: 'dashboard' })}
              </Tab>
              <Tab fontSize={{ base: '12px', sm: '14px', md: '16px' }}>
                {t('my_courses', { ns: 'dashboard' })}
              </Tab>
              <Tab fontSize={{ base: '12px', sm: '14px', md: '16px' }}>
                {t('saved_cards', { ns: 'dashboard' })}
              </Tab>
              <Tab fontSize={{ base: '12px', sm: '14px', md: '16px' }}>
                {t('danger_zone', { ns: 'dashboard' })}
              </Tab>
            </TabList>
            <TabPanels>
              {isLoading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <>
                  {tabIndex === 0 && user && <Account />}
                  {tabIndex === 1 && <Settings />}
                  {tabIndex === 2 && (
                    <Transactions transactions={transactions} />
                  )}
                  {tabIndex === 3 && <MyCourses myCourses={myCourses} />}
                  {tabIndex === 4 && <SavedCards savedCards={savedCards} />}
                  {tabIndex === 5 && <DangerZone />}
                </>
              )}
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
};

export default DashboardPageComponent;
