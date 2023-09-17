import { useQuery } from '@apollo/client';
import { GET_CONTRIBUTION_CALENDAR_INFO } from '../../endpoints/queries';
import { useParams } from 'react-router-dom';
import { IContributionCalendarInfo } from '../../utils/types/queryTypes';
import { Flex, Text, Card } from '@chakra-ui/react';

export const ContributionCalendar = () => {
  const { userLogin } = useParams();

  const { data, loading, error } = useQuery<IContributionCalendarInfo>(
    GET_CONTRIBUTION_CALENDAR_INFO,
    {
      variables: {
        login: userLogin,
      },
    }
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <Text>ContributionCalendar</Text>
      <Text>
        {
          data?.user.contributionsCollection.contributionCalendar
            .totalContributions
        }
      </Text>

      <Card
        size='sm'
        variant='outline'
        p='15px'>
        <Flex direction='column'>
          <Flex gap='5px'>
            <Flex
              gap='5px'
              direction='column'>
              {daysOfWeek.map((item, index) => {
                if (index === 1 || index === 3 || index === 5) {
                  return (
                    <Text
                      key={item}
                      height='11px'
                      fontSize='xs'
                      lineHeight={1}>
                      {item}
                    </Text>
                  );
                }

                return (
                  <Text
                    key={item}
                    opacity={0}
                    height='11px'
                    fontSize='xs'
                    lineHeight={1}>
                    {item}
                  </Text>
                );
              })}
            </Flex>

            {data?.user.contributionsCollection.contributionCalendar.weeks.map(
              (item, index) => {
                return (
                  <Flex
                    gap='5px'
                    direction='column'
                    key={index}>
                    {item.contributionDays.map(i => {
                      return (
                        <Flex
                          key={i.date}
                          height='11px'
                          width='11px'
                          rounded='3px'
                          border='1px solid'
                          borderColor='blackAlpha.100'
                          backgroundColor={i.color}></Flex>
                      );
                    })}
                  </Flex>
                );
              }
            )}
          </Flex>
        </Flex>
      </Card>
    </>
  );
};
