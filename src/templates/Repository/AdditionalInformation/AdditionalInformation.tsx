import { Flex, Heading, Text, Circle } from '@chakra-ui/react';
import { IRepositoryInfo } from '../../../utils/types/queryTypes';
import { ImStarEmpty } from 'react-icons/im';
import { LuEye } from 'react-icons/lu';
import { GoRepoForked } from 'react-icons/go';

interface AdditionalInformationProps {
  data: IRepositoryInfo;
}

export const AdditionalInformation = ({ data }: AdditionalInformationProps) => {
  const LANGUAGE_TOTAL_SIZE = data?.repository.languages.totalSize;

  return (
    <Flex
      direction='column'
      gap='20px'>
      <Flex
        direction='column'
        gap='20px'
        paddingBottom='20px'
        borderBottom='1px solid'
        borderColor='blackAlpha.100'>
        <Heading size='sm'>About</Heading>
        <Text
          fontWeight='medium'
          fontSize='sm'>
          {data?.repository.description}
        </Text>

        <Flex
          direction='column'
          gap='10px'>
          <Flex
            alignItems='center'
            gap='5px'
            color='blackAlpha.700'
            fontSize='15px'>
            <ImStarEmpty
              fontWeight='medium'
              size='15px'
            />
            <Text
              ml='3px'
              fontWeight='bold'>
              {data.repository.stargazerCount}
            </Text>
            <Text fontWeight='medium'>stars</Text>
          </Flex>
          <Flex
            alignItems='center'
            gap='5px'
            color='blackAlpha.700'
            fontSize='14px'>
            <LuEye
              fontWeight='medium'
              size='15px'
            />
            <Text
              ml='3px'
              fontWeight='bold'>
              {data.repository.watchers.totalCount}
            </Text>
            <Text fontWeight='medium'>watching</Text>
          </Flex>
          <Flex
            alignItems='center'
            gap='5px'
            color='blackAlpha.700'
            fontSize='14px'>
            <GoRepoForked
              fontWeight='medium'
              size='15px'
            />
            <Text
              ml='3px'
              fontWeight='bold'>
              {data.repository.forkCount}
            </Text>
            <Text fontWeight='medium'>forks</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        direction='column'
        gap='20px'
        paddingBottom='20px'
        borderBottom='1px solid'
        borderColor='blackAlpha.100'>
        <Heading size='sm'>Languages</Heading>

        <Flex
          gap='10px'
          flexWrap='wrap'>
          <Flex
            backgroundColor='blackAlpha.300'
            height='7px'
            width='100%'
            rounded='md'
            overflow='hidden'>
            {data?.repository.languages.edges.map(item => {
              return (
                <Flex
                  key={item.node.name}
                  backgroundColor={item.node.color}
                  height='7px'
                  zIndex={1}
                  width={`${
                    LANGUAGE_TOTAL_SIZE &&
                    ((item.size * 100) / LANGUAGE_TOTAL_SIZE).toFixed(1)
                  }%`}
                />
              );
            })}
          </Flex>
          {data?.repository.languages.edges.map(item => {
            return (
              <Flex
                gap='5px'
                alignItems='center'
                key={item.node.id}>
                <Circle
                  size='10px'
                  bg={item.node.color}
                />
                <Text
                  fontWeight='bold'
                  fontSize='xs'>
                  {item.node.name}
                </Text>
                <Text
                  fontWeight='bold'
                  fontSize='xs'
                  color='blackAlpha.600'>
                  {LANGUAGE_TOTAL_SIZE &&
                    ((item.size * 100) / LANGUAGE_TOTAL_SIZE).toFixed(1)}
                  %
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};
