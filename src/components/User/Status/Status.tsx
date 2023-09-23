import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_USER } from '../../../endpoints/queries';
import { CHANGE_USER_STATUS } from '../../../endpoints/mutations';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

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
  const [isOpenedEmojiPicker, setIsOpenedEmojiPicker] =
    useState<boolean>(false);

  const [statusFormData, setStatusFormData] = useState<statusFormDataProps>({
    clientMutationId: id,
    emoji: status.emoji ? status.emoji : '',
    message: status.message ? status.message : '',
  });

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const [changeUserStatus, { loading }] = useMutation(CHANGE_USER_STATUS, {
    refetchQueries: [GET_USER],
    awaitRefetchQueries: true,
  });

  const emojiPickerHandler = (emojiData: EmojiClickData) => {
    setStatusFormData({ ...statusFormData, emoji: emojiData.emoji });
    setIsOpenedEmojiPicker(false);
  };

  const onOpenModalHandler = () => {
    setStatusFormData({
      ...statusFormData,
      emoji: status.emoji ? status.emoji : '',
      message: status.message ? status.message : '',
    });
    onOpenModal();
  };

  const onSubmitStatusHandler = () => {
    changeUserStatus({
      variables: {
        clientMutationId: statusFormData.clientMutationId,
        message: statusFormData.message,
        emoji: statusFormData.emoji,
      },
    });

    onCloseModal();
  };

  const onClearStatusHandler = () => {
    setStatusFormData({ ...statusFormData, emoji: '', message: '' });
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

      <Modal
        isOpen={loading || isOpenModal}
        onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            p='15px 20px'
            backgroundColor='blackAlpha.100'
            borderBottom='1px solid'
            borderColor='blackAlpha.300'
            fontSize='md'
            fontWeight='medium'
            lineHeight={1}>
            Edit status
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody position='relative'>
            <InputGroup
              size='sm'
              rounded='md'>
              <InputLeftAddon>
                {
                  <Button
                    variant='unstyled'
                    onClick={() => setIsOpenedEmojiPicker(true)}>
                    {statusFormData.emoji ? statusFormData.emoji : '🫥'}
                  </Button>
                }
              </InputLeftAddon>
              <Input
                type='text'
                placeholder='Whats happening?'
                value={statusFormData.message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStatusFormData({
                    ...statusFormData,
                    message: e.target.value,
                  })
                }
              />
            </InputGroup>

            {isOpenedEmojiPicker && (
              <Flex
                position='absolute'
                zIndex={1}>
                <EmojiPicker
                  lazyLoadEmojis={true}
                  onEmojiClick={(emojiData: EmojiClickData) =>
                    emojiPickerHandler(emojiData)
                  }
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter justifyContent='center'>
            <Button
              isLoading={loading}
              colorScheme='green'
              mr={3}
              onClick={onSubmitStatusHandler}>
              Set status
            </Button>
            <Button
              variant='ghost'
              onClick={onClearStatusHandler}>
              Clear status
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
