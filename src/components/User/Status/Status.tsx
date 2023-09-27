import { Flex, Link, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { StatusModal } from './StatusModal';

interface StatusProps {
  id: string;
  status: {
    emojiHTML: string;
    emoji: string;
    expiresAt: string;
    message: string;
  };
  isViewer: boolean;
}

interface statusFormDataProps {
  clientMutationId: string;
  emoji: string;
  message: string;
}

export const Status = ({ id, status, isViewer }: StatusProps) => {
  const [hoveredStatus, setHoveredStatus] = useState<boolean>(false);

  const [statusFormData, setStatusFormData] = useState<statusFormDataProps>({
    clientMutationId: '',
    emoji: '',
    message: '',
  });

  const {
    onOpen: onOpenModal,
    isOpen: isOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  useEffect(() => {
    if (!status) {
      return;
    }

    setStatusFormData({
      clientMutationId: id,
      emoji: status.emojiHTML ? status.emojiHTML : '',
      message: status.message ? status.message : '',
    });
  }, [id, status]);

  const onOpenModalHandler = () => {
    setStatusFormData({
      ...statusFormData,
      emoji: status.emojiHTML ? status.emojiHTML : '',
      message: status.message ? status.message : '',
    });
    onOpenModal();
  };

  return (
    <>
      {!isViewer && !status ? null : (
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
          onMouseEnter={() => setHoveredStatus(true)}
          onMouseLeave={() => setHoveredStatus(false)}>
          {status ? (
            <Link
              _hover={{ cursor: 'pointer' }}
              textDecoration='none'
              onClick={onOpenModalHandler}>
              <Flex
                fontSize='xs'
                fontWeight='medium'
                alignItems='center'
                dangerouslySetInnerHTML={{
                  __html: !hoveredStatus
                    ? status.emojiHTML
                      ? status.emojiHTML
                      : '💭'
                    : `${status.emojiHTML ? status.emojiHTML : '💭'} ${
                        status.message ? status.message : ''
                      }`,
                }}
              />
            </Link>
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
        </Flex>
      )}
      {isViewer && (
        <StatusModal
          id={id}
          status={status}
          isOpenModal={isOpenModal}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};
