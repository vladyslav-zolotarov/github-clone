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

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const ITEM_STYLE_SIZE = '9px';
  const ITEM_GAP_STYLE_SIZE = '3px';

  if (loading || contributionsCollectionLoading) return <Text>Loading...</Text>;

  if (error || contributionsCollectionError) return <Text>Error...</Text>;

  return (
    <Grid
      gridTemplateColumns='1fr 100px'
      gap='20px'>
      {data &&
      data.user.contributionsCollection.contributionCalendar
        .totalContributions ? (
        <Heading
          gridColumn={1}
          as='h2'
          size='sm'
          fontWeight='medium'>
          {
            data.user.contributionsCollection.contributionCalendar
              .totalContributions
          }
          <Text
            as='span'
            ml='5px'>
            contributions in last year
          </Text>
        </Heading>
      ) : null}

      <Card
        gridColumn={1}
        size='sm'
        variant='outline'
        p='15px'>
        <Flex
          direction='column'
          // overflowX='scroll'
        >
          <Flex marginLeft='33px'>
            <Flex gap={ITEM_GAP_STYLE_SIZE}>
              {data &&
              data.user.contributionsCollection.contributionCalendar.months
                ? data.user.contributionsCollection.contributionCalendar.months.map(
                    item => {
                      if (item.totalWeeks < 4) {
                        return;
                      }

                      return (
                        <Text
                          key={`${item.name}${item.firstDay}`}
                          height={ITEM_STYLE_SIZE}
                          fontSize='xs'
                          lineHeight={1}
                          marginBottom='10px'
                          w={`calc((${ITEM_STYLE_SIZE} * ${
                            item.totalWeeks
                          }) + ${ITEM_GAP_STYLE_SIZE} * ${
                            item.totalWeeks - 1
                          })`}>
                          {item.name}
                        </Text>
                      );
                    }
                  )
                : null}
            </Flex>
          </Flex>

          <Flex
            direction='column'
            mb='20px'>
            <Flex
              gap={ITEM_GAP_STYLE_SIZE}
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
                        height={ITEM_STYLE_SIZE}
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
                      height={ITEM_STYLE_SIZE}
                      fontSize='xs'
                      lineHeight={1}>
                      {item}
                    </Text>
                  );
                })}
              </Flex>

              {data &&
              data.user.contributionsCollection.contributionCalendar.weeks
                ? data.user.contributionsCollection.contributionCalendar.weeks.map(
                    (item, index) => {
                      return (
                        <Flex
                          gap='5px'
                          direction='column'
                          key={index}>
                          {item.contributionDays.map(i => {
                            const currentTooltipLabel = `${
                              i.contributionCount === 0
                                ? `No`
                                : i.contributionCount
                            } contributions on ${
                              daysOfWeek[i.weekday]
                            }, ${format(
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
                                  height={ITEM_STYLE_SIZE}
                                  width={ITEM_STYLE_SIZE}
                                  rounded='3px'
                                  backgroundColor={i.color}
                                  border='1px solid'
                                  borderColor={i.color}
                                />
                              </Tooltip>
                            );
                          })}
                        </Flex>
                      );
                    }
                  )
                : null}
            </Flex>
          </Flex>
        </Flex>
        <Flex
          alignItems='center'
          gap='5px'
          ml='auto'>
          <Text
            height={ITEM_STYLE_SIZE}
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
          {data && data.user.contributionsCollection.contributionCalendar.colors
            ? data.user.contributionsCollection.contributionCalendar.colors.map(
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
              )
            : null}
          <Text
            height={ITEM_STYLE_SIZE}
            fontSize='xs'
            lineHeight={1}>
            More
          </Text>
        </Flex>
      </Card>

      {contributionsCollectionData ? (
        <Flex
          gridColumn={2}
          gridRow='1 / span 2'
          direction='column'
          gap='10px'>
          {contributionsCollectionData.user.contributionsCollection.contributionYears.map(
            item => {
              return (
                <Button
                  key={item}
                  size='xs'
                  variant='ghost'
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
      ) : null}
    </Grid>
  );
};
