import { Flex, Link, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { StatusModal } from './StatusModal';

interface StatusProps {
  id: string;
  status: {
    emoji: string;
    expiresAt: string;
    message: string;
  };
}

interface statusFormDataProps {
  clientMutationId: string;
  emoji: string;
  message: string;
}

export const Status = ({ id, status }: StatusProps) => {
  const [hoveredStatus, setHoveredStatus] = useState<boolean>(false);

  const [statusFormData, setStatusFormData] = useState<statusFormDataProps>({
    clientMutationId: id,
    emoji: status.emoji ? status.emoji : '',
    message: status.message ? status.message : '',
  });

  const {
    onOpen: onOpenModal,
    isOpen: isOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const onOpenModalHandler = () => {
    setStatusFormData({
      ...statusFormData,
      emoji: status.emoji ? status.emoji : '',
      message: status.message ? status.message : '',
    });
    onOpenModal();
  };

  return (
    <>
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
        onMouseEnter={() => setHoveredStatus(true)}
        onMouseLeave={() => setHoveredStatus(false)}>
        <Link
          textDecoration='none'
          onClick={onOpenModalHandler}>
          {status ? (
            <Flex
              fontSize='xs'
              fontWeight='medium'
              alignItems='center'
              dangerouslySetInnerHTML={{
                __html: !hoveredStatus
                  ? status.emoji
                  : `${status.emoji} ${status.message}`,
              }}
            />
          ) : (
            <Flex
              fontSize='xs'
              fontWeight='medium'
              alignItems='center'
              dangerouslySetInnerHTML={{
                __html: !hoveredStatus ? '🫥' : '🫥 Set status',
              }}
            />
          )}
        </Link>
      </Flex>

      <StatusModal
        id={id}
        status={status}
        isOpenModal={isOpenModal}
        onCloseModal={onCloseModal}
      />
    </>
  );
};
