import {
  Text,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Link,
  Button,
} from '@chakra-ui/react';
import {
  format,
  formatDistanceToNow,
  differenceInCalendarDays,
} from 'date-fns';
import {
  IRepositoryInfoCommit,
  IRepositoryInfoTree,
} from '../../../utils/types/queryTypes';
import {
  GET_REPOSITORY_INFO_COMMIT,
  GET_REPOSITORY_INFO_TREE,
} from '../../../endpoints/queries';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { ReadMe, FileItem, FolderItem, UserAvatar } from '../../../components';
import { VscGitCommit } from 'react-icons/vsc';
import { useState } from 'react';

export const FileFolderList = () => {
  const navigate = useNavigate();
  const { userLogin, repositoryName } = useParams();
  const [showedMessageBody, setShowedMessageBody] = useState<boolean>(false);

  const {
    data: dataTree,
    loading: loadingTree,
    error: errorTree,
  } = useQuery<IRepositoryInfoTree>(GET_REPOSITORY_INFO_TREE, {
    variables: { name: repositoryName, owner: userLogin },
  });

  const {
    data: dataCommit,
    loading: loadingCommit,
    error: errorCommit,
  } = useQuery<IRepositoryInfoCommit>(GET_REPOSITORY_INFO_COMMIT, {
    variables: { name: repositoryName, owner: userLogin },
  });

  if (loadingTree || loadingCommit) return <Text>Loading...</Text>;

  if (errorTree || errorCommit) return <Text>Error ...</Text>;

  return (
    <Flex
      direction='column'
      gap='20px'>
      {dataCommit && dataTree ? (
        <>
          <TableContainer
            border='1px'
            rounded='md'
            borderColor='blackAlpha.300'>
            <Table variant='simple'>
              <Thead backgroundColor='blackAlpha.50'>
                <Tr>
                  <Td padding='10px 20px'>
                    <Flex
                      paddingBlock='4px'
                      justifyContent='space-between'>
                      <Flex
                        gap='13px'
                        alignItems='center'>
                        {dataCommit.repository.object.author ? (
                          <Link
                            display='flex'
                            gap='10px'
                            alignItems='center'
                            onClick={() =>
                              navigate(
                                `/user/${dataCommit.repository.object.author?.user?.login}/overview`,
                                {
                                  replace: true,
                                }
                              )
                            }>
                            <UserAvatar
                              size='xs'
                              name={
                                dataCommit.repository.object.author?.user?.login
                              }
                              src={
                                dataCommit.repository.object.author?.avatarUrl
                              }
                            />

                            <Text
                              fontSize='sm'
                              fontWeight='semibold'>
                              {dataCommit.repository.object.author?.user?.login}
                            </Text>
                          </Link>
                        ) : null}
                        <Flex
                          alignItems='center'
                          gap='10px'>
                          {dataCommit.repository.object.messageHeadline ? (
                            <Text
                              fontSize='sm'
                              fontWeight='medium'>
                              {dataCommit.repository.object.messageHeadline}
                            </Text>
                          ) : null}

                          {dataCommit.repository.object.messageBody ? (
                            <Button
                              size='xs'
                              colorScheme='gray'
                              onClick={() =>
                                setShowedMessageBody(!showedMessageBody)
                              }>
                              ...
                            </Button>
                          ) : null}
                        </Flex>
                      </Flex>
                      <Flex
                        gap='13px'
                        alignItems='center'>
                        {dataCommit.repository.object.abbreviatedOid ? (
                          <Text
                            fontSize='sm'
                            color='blackAlpha.600'
                            fontWeight='medium'>
                            {dataCommit.repository.object.abbreviatedOid}
                          </Text>
                        ) : null}
                        {dataCommit.repository.object.committedDate ? (
                          <Text
                            fontSize='sm'
                            fontWeight='semibold'
                            color='blackAlpha.600'>
                            {differenceInCalendarDays(
                              new Date(),
                              new Date(
                                `${dataCommit.repository.object.committedDate}`
                              )
                            ) < 14 ? (
                              formatDistanceToNow(
                                new Date(
                                  `${dataCommit.repository.object.committedDate}`
                                ),
                                {
                                  includeSeconds: true,
                                }
                              )
                            ) : (
                              <Text as='span'>
                                on
                                <Text
                                  ml='4px'
                                  as='span'>
                                  {format(
                                    new Date(
                                      `${dataCommit.repository.object.committedDate}`
                                    ),
                                    'dd MMM yyyy'
                                  )}
                                </Text>
                              </Text>
                            )}
                          </Text>
                        ) : null}
                        <Flex
                          alignItems='center'
                          gap='1px'>
                          <VscGitCommit size='14px' />
                          {dataCommit.repository.object.history.totalCount ? (
                            <Text
                              fontSize='sm'
                              fontWeight='semibold'>
                              {dataCommit.repository.object.history.totalCount}
                              <Text
                                ml='4px'
                                as='span'
                                color='blackAlpha.600'>
                                commits
                              </Text>
                            </Text>
                          ) : null}
                        </Flex>
                      </Flex>
                    </Flex>

                    {showedMessageBody && (
                      <Flex
                        direction='column'
                        gap='10px'
                        paddingLeft='34px'
                        maxWidth='60%'
                        whiteSpace='break-spaces'>
                        {dataCommit.repository.object.messageBody ? (
                          <>
                            {dataCommit.repository.object.messageHeadline ? (
                              <Text
                                fontSize='sm'
                                fontWeight='semibold'>
                                {dataCommit.repository.object.messageHeadline}
                              </Text>
                            ) : null}
                            <Text
                              fontSize='xs'
                              fontWeight='medium'
                              color='blackAlpha.00'>
                              {dataCommit.repository.object.messageBody}
                            </Text>
                          </>
                        ) : null}
                      </Flex>
                    )}
                  </Td>
                </Tr>
              </Thead>
              {dataTree.repository.object.entries ? (
                <Tbody>
                  {dataTree?.repository.object.entries
                    .filter(rep => rep.extension === '')
                    .map(folder => {
                      return (
                        <Tr key={folder.name}>
                          <Td padding='10px 20px'>
                            <FolderItem data={folder} />
                          </Td>
                        </Tr>
                      );
                    })}
                  {dataTree.repository.object.entries
                    .filter(rep => rep.extension !== '')
                    .map(file => {
                      return (
                        <Tr key={file.name}>
                          <Td padding='10px 20px'>
                            <FileItem data={file} />
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              ) : null}
            </Table>
          </TableContainer>

          {dataTree.repository.object.entries
            ? dataTree.repository.object.entries
                .filter(rep => rep.extension !== '')
                .map(file => {
                  return (
                    <ReadMe
                      key={file.name}
                      data={file}
                    />
                  );
                })
            : null}
        </>
      ) : null}
    </Flex>
  );
};
