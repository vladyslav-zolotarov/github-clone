import {
  Text,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Image,
  Link,
} from '@chakra-ui/react';
import {
  format,
  formatDistanceToNow,
  differenceInCalendarDays,
} from 'date-fns';
import {
  IRepositoryInfoCommit,
  IRepositoryInfoTree,
} from '../../../utils/types/types';
import {
  GET_REPOSITORY_INFO_COMMIT,
  GET_REPOSITORY_INFO_TREE,
} from '../../../endpoints/endpoint';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { ReadMe, FileItem, FolderItem } from '../../index';
import { VscGitCommit } from 'react-icons/vsc';

export const FileFolderList = () => {
  const { userLogin, repositoryName } = useParams();

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

  const navigate = useNavigate();

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
                    <Flex
                      gap='10px'
                      alignItems='center'>
                      <Image
                        rounded={'50%'}
                        boxSize='24px'
                        src={dataCommit?.repository?.owner?.avatarUrl}
                        alt={dataCommit?.repository?.owner?.id}
                      />
                      <Link
                        onClick={() =>
                          navigate(
                            `/user/${dataCommit?.repository?.owner?.login}/overview`,
                            {
                              replace: true,
                            }
                          )
                        }>
                        <Text
                          fontSize='sm'
                          fontWeight='semibold'>
                          {dataCommit?.repository?.owner?.login}
                        </Text>
                      </Link>
                    </Flex>
                    <Text fontSize='sm'>
                      {dataCommit?.repository.object.message}
                    </Text>
                  </Flex>
                  <Flex
                    gap='13px'
                    alignItems='center'>
                    <Text
                      fontSize='sm'
                      color='blackAlpha.600'
                      fontWeight='medium'>
                      {dataCommit?.repository.object.abbreviatedOid}
                    </Text>
                    <Text
                      fontSize='sm'
                      fontWeight='semibold'
                      color='blackAlpha.600'>
                      {differenceInCalendarDays(
                        new Date(),
                        new Date(
                          `${dataCommit?.repository.object.committedDate}`
                        )
                      ) < 14 ? (
                        formatDistanceToNow(
                          new Date(
                            `${dataCommit?.repository.object.committedDate}`
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
                                `${dataCommit?.repository.object.committedDate}`
                              ),
                              'dd MMM yyyy'
                            )}
                          </Text>
                        </Text>
                      )}
                    </Text>
                    <Flex
                      alignItems='center'
                      gap='1px'>
                      <VscGitCommit size='14px' />
                      <Text
                        fontSize='sm'
                        fontWeight='semibold'>
                        {dataCommit?.repository.object.history.totalCount}
                        <Text
                          ml='4px'
                          as='span'
                          color='blackAlpha.600'>
                          commits
                        </Text>
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
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
