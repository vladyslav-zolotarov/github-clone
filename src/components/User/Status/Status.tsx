import { useState } from 'react';
import { Flex } from '@chakra-ui/react';

interface StatusProps {
  status: {
    emojiHTML: string;
    expiresAt: string;
    message: string;
  };
}

export const Status = ({ status }: StatusProps) => {
  const [openedStatus, setOpenedStatus] = useState(false);

  return (
    <Flex
      position='absolute'
      bottom='30px'
      left='0'
      zIndex={1}
      alignItems='center'
      justifyContent='center'
      h='38px'
      minW='38px'
      width='auto'
      rounded='full'
      border='1px solid'
      backgroundColor='white'
      borderColor='blackAlpha.400'
      padding='10px'
      _hover={{ cursor: 'pointer' }}
      onMouseEnter={() => setOpenedStatus(true)}
      onMouseLeave={() => setOpenedStatus(false)}>
      <Flex
        fontSize='xs'
        fontWeight='medium'
        alignItems='center'
        dangerouslySetInnerHTML={{
          __html: !openedStatus
            ? status.emojiHTML
            : `${status.emojiHTML} ${status.message}`,
        }}
      />
    </Flex>
  );
};
