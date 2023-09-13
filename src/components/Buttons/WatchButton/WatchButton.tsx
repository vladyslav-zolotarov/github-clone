import { Text, Button, Circle } from '@chakra-ui/react';

import { RiArrowDownSLine } from 'react-icons/ri';
import { LuEye } from 'react-icons/lu';

interface WatchButtonProps {
  totalCount: number;
}

export const WatchButton = ({ totalCount }: WatchButtonProps) => {
  return (
    <Button
      gap='10px'
      variant='outline'
      size='sm'
      // onClick={() => handleStarToggler(id, viewerHasStarred)}
      // isLoading={loadingAddStart || loadingRemoveStart}
      loadingText='Loading'>
      <LuEye size='18px' />

      <Text fontSize='sm'>Watch</Text>
      <Circle
        size='21px'
        background='blackAlpha.100'
        color='black'>
        {totalCount}
      </Circle>
      <RiArrowDownSLine />
    </Button>
  );
};
