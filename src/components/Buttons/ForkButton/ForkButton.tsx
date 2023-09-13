import {
  Text,
  Button,
  ButtonGroup,
  IconButton,
  Circle,
} from '@chakra-ui/react';

import { RiArrowDownSLine } from 'react-icons/ri';
import { GoRepoForked } from 'react-icons/go';

interface ForkButtonProps {
  forkCount: number;
  forkingAllowed: boolean;
}

export const ForkButton = ({ forkCount, forkingAllowed }: ForkButtonProps) => {
  return (
    <ButtonGroup
      isAttached
      variant='outline'
      size='sm'
      isDisabled={forkingAllowed}>
      <Button
        gap='10px'
        // onClick={() => handleStarToggler(id, viewerHasStarred)}
        // isLoading={loadingAddStart || loadingRemoveStart}
        loadingText='Loading'>
        <GoRepoForked size='16px' />

        <Text fontSize='sm'>Fork</Text>
        <Circle
          size='21px'
          background='blackAlpha.100'
          color='black'>
          {forkCount}
        </Circle>
      </Button>
      <IconButton
        aria-label='Add to friends'
        icon={<RiArrowDownSLine />}
      />
    </ButtonGroup>
  );
};
