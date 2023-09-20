import format from 'date-fns/format';
import { useQuery } from '@apollo/client';
import {
  GET_CONTRIBUTION_CALENDAR_INFO,
  GET_CONTRIBUTION_COLLECTION_INFO,
} from '../../endpoints/queries';
import { useParams } from 'react-router-dom';
import {
  IContributionCalendarInfo,
  IContributionsCollectionInfo,
} from '../../utils/types/queryTypes';
import {
  Flex,
  Text,
  Card,
  Tooltip,
  Heading,
  Grid,
  Button,
} from '@chakra-ui/react';

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

  const {
    data: contributionsCollectionData,
    loading: contributionsCollectionLoading,
    error: contributionsCollectionError,
  } = useQuery<IContributionsCollectionInfo>(GET_CONTRIBUTION_COLLECTION_INFO, {
    variables: { login: userLogin },
  });

  if (loading || contributionsCollectionLoading) return <Text>Loading...</Text>;

  if (error || contributionsCollectionError) return <Text>Error...</Text>;

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <Heading
        as='h2'
        size='sm'
        fontWeight='medium'
        mb='15px'>
        {
          data?.user.contributionsCollection.contributionCalendar
            .totalContributions
        }
        <Text
          as='span'
          ml='5px'>
          contributions in last year
        </Text>
      </Heading>

      <Grid
        gridTemplateColumns='1fr 150px'
        gap='20px'>
        <Card
          size='sm'
          variant='outline'
          p='15px'>
          <Flex
            gap='5px'
            marginLeft='35px'>
            {data?.user.contributionsCollection.contributionCalendar.months.map(
              item => {
                return (
                  <Text
                    key={`${item.name}${item.firstDay}`}
                    height='11px'
                    fontSize='xs'
                    lineHeight={1}
                    marginBottom='10px'
                    w={`calc((11px * ${item.totalWeeks}) + 5px * ${
                      item.totalWeeks - 1
                    })`}>
                    {item.name}
                  </Text>
                );
              }
            )}
          </Flex>

          <Flex
            direction='column'
            mb='20px'
            overflowX='scroll'>
            <Flex
              gap='5px'
              padding='10px 0'>
              <Flex
                gap='5px'
                marginRight='5px'
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
                        const currentTooltipLabel = `${
                          i.contributionCount === 0 ? `No` : i.contributionCount
                        } contributions on ${daysOfWeek[i.weekday]}, ${format(
                          new Date(`${i.date}`),
                          'MMMM d, yyyy'
                        )}`;

                        return (
                          <Tooltip
                            key={i.date}
                            fontSize='xs'
                            hasArrow
                            arrowSize={10}
                            placement='top'
                            label={currentTooltipLabel}
                            aria-label='A tooltip'>
                            <Flex
                              height='11px'
                              width='11px'
                              rounded='3px'
                              border='1px solid'
                              borderColor='blackAlpha.100'
                              backgroundColor={i.color}
                            />
                          </Tooltip>
                        );
                      })}
                    </Flex>
                  );
                }
              )}
            </Flex>
          </Flex>

          <Flex
            alignItems='center'
            gap='5px'
            ml='auto'>
            <Text
              height='11px'
              fontSize='xs'
              lineHeight={1}>
              Less
            </Text>

            <Flex
              height='10px'
              width='10px'
              rounded='3px'
              border='1px solid'
              borderColor='blackAlpha.100'
              backgroundColor='#ebedf0'
            />
            {data?.user.contributionsCollection.contributionCalendar.colors.map(
              item => {
                return (
                  <Flex
                    key={item}
                    height='10px'
                    width='10px'
                    rounded='3px'
                    border='1px solid'
                    borderColor='blackAlpha.100'
                    backgroundColor={item}
                  />
                );
              }
            )}
            <Text
              height='11px'
              fontSize='xs'
              lineHeight={1}>
              More
            </Text>
          </Flex>
        </Card>

        {contributionsCollectionData && (
          <Flex
            direction='column'
            gap='10px'>
            {contributionsCollectionData.user.contributionsCollection.contributionYears.map(
              item => {
                return (
                  <Button
                    size='xs'
                    variant='outline'
                    justifyContent='flex-start'>
                    <Text
                      fontSize='xs'
                      fontWeight='medium'>
                      {item}
                    </Text>
                  </Button>
                );
              }
            )}
          </Flex>
        )}
      </Grid>
    </>
  );
};
