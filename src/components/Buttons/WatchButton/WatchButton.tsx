import { Text, Button, Circle } from '@chakra-ui/react';

import { RiArrowDownSLine } from 'react-icons/ri';
import { LuEye } from 'react-icons/lu';

interface WatchButtonProps {
  totalCount: number | string;
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
        minWidth='21px'
        minHeight='21px'
        padding='0 8px'
        background='blackAlpha.100'
        color='black'>
        <Text fontSize='xs'>{totalCount}</Text>
      </Circle>
      <RiArrowDownSLine />
    </Button>
  );
};
