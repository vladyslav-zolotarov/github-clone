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

interface StarButtonProps {
  id: string;
  viewerHasStarred: boolean;
  stargazerCount: number;
}

export const StarButton = ({
  id,
  viewerHasStarred,
  stargazerCount,
}: StarButtonProps) => {
  const {
    handleStarToggler,
    loadingAddStart,
    loadingRemoveStart,
    errorAddStart,
    errorRemoveStart,
  } = useStarToggler();

  console.log('StarButton - error', errorAddStart, errorRemoveStart);

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
        <Circle
          size='21px'
          background='blackAlpha.100'
          color='black'>
          <Text fontSize='xs'>{stargazerCount}</Text>
        </Circle>
      </Button>
      <IconButton
        aria-label='Add to friends'
        icon={<RiArrowDownSLine />}
      />
    </ButtonGroup>
  );
};
