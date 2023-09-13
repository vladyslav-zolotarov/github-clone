import { Text, Button } from '@chakra-ui/react';
import { AiOutlinePushpin } from 'react-icons/ai';

export const PinButton = () => {
  return (
    <Button
      gap='10px'
      variant='outline'
      size='sm'
      // onClick={() => handleStarToggler(id, viewerHasStarred)}
      // isLoading={loadingAddStart || loadingRemoveStart}
      loadingText='Loading'>
      <AiOutlinePushpin size='18px' />

      <Text fontSize='sm'>Pin</Text>
    </Button>
  );
};
