import { useState } from 'react';
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
import { useMutation } from '@apollo/client';
import { GET_USER } from '../../../endpoints/queries';
import { CHANGE_USER_STATUS } from '../../../endpoints/mutations';

interface StatusProps {
  status: {
    emojiHTML: string;
    expiresAt: string;
    message: string;
  };
}

export const Status = ({ status }: StatusProps) => {
  const [openedStatus, setOpenedStatus] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [changeUserStatus, { loading, error }] = useMutation(
    CHANGE_USER_STATUS,
    {
      refetchQueries: [GET_USER],
      awaitRefetchQueries: true,
    }
  );

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
        onMouseEnter={() => setOpenedStatus(true)}
        onMouseLeave={() => setOpenedStatus(false)}>
        <Link
          textDecoration='none'
          onClick={onOpen}>
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
        </Link>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}>
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
          <ModalBody>
            <InputGroup
              size='sm'
              rounded='md'>
              <InputLeftAddon children='😀' />
              <Input
                type='text'
                placeholder='Whats happening?'
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter justifyContent='center'>
            <Button
              colorScheme='green'
              mr={3}
              onClick={onClose}>
              Set status
            </Button>
            <Button variant='ghost'>Clear status</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
