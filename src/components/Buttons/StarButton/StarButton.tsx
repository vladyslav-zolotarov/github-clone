import {
  Text,
  Button,
  ButtonGroup,
  IconButton,
  Circle,
} from '@chakra-ui/react';

import { ImStarEmpty, ImStarFull } from 'react-icons/im';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useStarToggler } from '../../../hooks/useStarToggler';
import { DocumentNode } from 'graphql';

interface StarButtonProps {
  id: string;
  viewerHasStarred: boolean;
  stargazerCount: number | string;
  hideStargazerCount?: boolean;
  endpointQueryUpdate?: DocumentNode;
  variant: 'starButton' | 'starIcon';
}

export const StarButton = ({
  id,
  viewerHasStarred,
  stargazerCount,
  hideStargazerCount,
  endpointQueryUpdate,
  variant,
}: StarButtonProps) => {
  const {
    handleStarToggler,
    loadingAddStart,
    loadingRemoveStart,
    errorAddStart,
    errorRemoveStart,
  } = useStarToggler({ endpointQueryUpdate });

  if (errorAddStart || errorRemoveStart) return <Text>Error...</Text>;

  const content = () => {
    if (variant === 'starButton') {
      return (
        <ButtonGroup
          isAttached
          variant='outline'
          size='sm'>
          <Button
            gap='10px'
            onClick={() => handleStarToggler(id, viewerHasStarred)}
            isLoading={loadingAddStart || loadingRemoveStart}
            loadingText='Loading'>
            {viewerHasStarred ? (
              <ImStarFull
                size='16px'
                color='#eac54f'
              />
            ) : (
              <ImStarEmpty size='16px' />
            )}
            <Text fontSize='sm'>{viewerHasStarred ? 'Stared' : 'Star'}</Text>
            {!hideStargazerCount ? (
              <Circle
                minWidth='21px'
                minHeight='21px'
                padding='0 8px'
                background='blackAlpha.100'
                color='black'>
                <Text fontSize='xs'>{stargazerCount}</Text>
              </Circle>
            ) : null}
          </Button>
          <IconButton
            aria-label='Add to friends'
            icon={<RiArrowDownSLine />}
          />
        </ButtonGroup>
      );
    }
    if (variant === 'starIcon') {
      if (!stargazerCount) {
        return;
      }

      return (
        <Button
          display='flex'
          alignItems='center'
          gap='5px'
          size='xs'
          variant='unstyled'
          color='blackAlpha.700'
          onClick={() => handleStarToggler(id, viewerHasStarred)}
          isLoading={loadingAddStart || loadingRemoveStart}>
          {viewerHasStarred ? (
            <ImStarFull
              size='15px'
              color='#eac54f'
            />
          ) : (
            <ImStarEmpty size='15px' />
          )}
          <Text
            fontSize='sm'
            fontWeight='medium'>
            {stargazerCount}
          </Text>
        </Button>
      );
    }
  };

  return content();
};
