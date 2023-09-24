import { useMutation } from '@apollo/client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  InputLeftAddon,
  Button,
  Input,
  Flex,
  ModalFooter,
} from '@chakra-ui/react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import React, { useState } from 'react';
import { CHANGE_USER_STATUS } from '../../../endpoints/mutations';
import { GET_USER } from '../../../endpoints/queries';

interface StatusModalProps {
  id: string;
  status: {
    emoji: string;
    expiresAt: string;
    message: string;
  };
  isOpenModal: boolean;
  onCloseModal: () => void;
}

interface statusFormDataProps {
  clientMutationId: string;
  emoji: string;
  message: string;
}

export const StatusModal = ({
  id,
  status,
  isOpenModal,
  onCloseModal,
}: StatusModalProps) => {
  const [isOpenedEmojiPicker, setIsOpenedEmojiPicker] =
    useState<boolean>(false);

  const [statusFormData, setStatusFormData] = useState<statusFormDataProps>({
    clientMutationId: id,
    emoji: status.emoji ? status.emoji : '',
    message: status.message ? status.message : '',
  });

  const [changeUserStatus, { loading }] = useMutation(CHANGE_USER_STATUS, {
    refetchQueries: [GET_USER],
    awaitRefetchQueries: true,
  });

  const emojiPickerHandler = (emojiData: EmojiClickData) => {
    setStatusFormData({ ...statusFormData, emoji: emojiData.emoji });
    setIsOpenedEmojiPicker(false);
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
  );
};
