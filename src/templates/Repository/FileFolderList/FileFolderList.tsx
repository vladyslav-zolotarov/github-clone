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
import { useEffect, useState } from 'react';

// type RepositoryReadMeFileState =
//   IRepositoryInfoTree['repository']['object']['entries'];

// type RepositoryReadMeFileState = Pick<IRepositoryInfoTree, 'repository'> & {
//   object?: Pick<IRepositoryInfoTree['repository'], 'object'> & {
//     entries?: Pick<IRepositoryInfoTree['repository']['object'], 'entries'>[];
//   };
// };

// type TenantManagePageQueryTenant =
// Pick<Tenant, 'id' | 'description' | 'name'> & {
//   approvedUsers: Array<Pick<Tenant['approvedUsers'][0], 'id' | 'alias'>>
// }

// type SimplifiedCompany = Pick<Company, 'name'> & {
//   offices?: Pick<Office, 'city'>[];
// }

export const FileFolderList = () => {
  const navigate = useNavigate();
  const { userLogin, repositoryName } = useParams();
  const [showedMessageBody, setShowedMessageBody] = useState<boolean>(false);
  // const [fileForderData, setFileFolderData] = useState<{
  //   RepositoryReadMeFile: RepositoryReadMeFileState[];
  //   RepositoryFolders: IRepositoryInfoTree;
  //   RepositoryFiles: IRepositoryInfoTree;
  // }>({
  //   RepositoryReadMeFile: {} as RepositoryReadMeFileState[],
  //   RepositoryFolders: {},
  //   RepositoryFiles: {},
  // });

  // as IRepositoryInfoTree['repository']['object']['entries'][]

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

  // useEffect(() => {
  //   if (!dataTree) {
  //     return;
  //   }

  //   setFileFolderData({
  //     ...fileForderData,
  //     RepositoryReadMeFile: RepositoryReadMeFile,
  //   });

  //   setFileFolderData({
  //     ...fileForderData,
  //     RepositoryFolders: RepositoryFolders,
  //   });

  //   setFileFolderData({ ...fileForderData, RepositoryFiles: RepositoryFiles });

  //   setFileFolderData({
  //     ...fileForderData,
  //     RepositoryReadMeFile: RepositoryReadMeFile,
  //     RepositoryFolders: RepositoryFolders,
  //     RepositoryFiles: RepositoryFiles,
  //   });
  // }, [dataTree, fileForderData]);

  if (loadingTree || loadingCommit) return <Text>Loading...</Text>;

  if (errorTree || errorCommit) return <Text>Error ...</Text>;

  const RepositoryReadMeFile = dataTree?.repository.object.entries.filter(
    rep => rep.extension === '.md'
  );

  const RepositoryFolders = dataTree?.repository.object.entries.filter(
    rep => rep.extension === ''
  );
  const RepositoryFiles = dataTree?.repository.object.entries.filter(
    rep => rep.extension !== ''
  );

  return (
    <Flex
      direction='column'
      gap='20px'>
      {dataCommit ? (
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
                            src={dataCommit.repository.object.author?.avatarUrl}
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
            <Tbody>
              {RepositoryFolders?.map(folder => {
                return (
                  <Tr key={folder.name}>
                    <Td padding='10px 20px'>
                      <FolderItem data={folder} />
                    </Td>
                  </Tr>
                );
              })}
              {RepositoryFiles?.map(file => {
                return (
                  <Tr key={file.name}>
                    <Td padding='10px 20px'>
                      <FileItem data={file} />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : null}
      {RepositoryReadMeFile?.map(file => {
        return (
          <ReadMe
            key={file.name}
            data={file}
          />
        );
      })}
    </Flex>
  );
};
