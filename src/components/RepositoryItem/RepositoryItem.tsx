import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IRepositoryInfoCommit,
  IRepositoryInfoTree,
} from '../../utils/types/types';
import {
  GET_REPOSITORY_INFO_COMMIT,
  GET_REPOSITORY_INFO_TREE,
} from '../../endpoints/endpoint';
import { ReadMe, FileItem, FolderItem, AdditionalInformation } from '../index';
import {
  Text,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Grid,
  Image,
  Link,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { BiGitCommit } from 'react-icons/bi';

export const RepositoryItem = () => {
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
    <Grid
      gap='20px'
      w='full'
      templateColumns='1fr minmax(0, 260px) '>
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
                      gap='10px'
                      alignItems='center'>
                      <Flex
                        gap='10px'
                        alignItems='center'>
                        <Image
                          rounded={'50%'}
                          boxSize='24px'
                          src={dataCommit?.repository.owner.avatarUrl}
                          alt={dataCommit?.repository.owner.id}
                        />
                        <Link
                          onClick={() =>
                            navigate(
                              `/user/${dataCommit?.repository.owner.login}/overview`,
                              {
                                replace: true,
                              }
                            )
                          }>
                          <Text
                            fontSize='md'
                            fontWeight='medium'>
                            {dataCommit?.repository.owner.login}
                          </Text>
                        </Link>
                      </Flex>
                      <Text fontSize='xs'>
                        {dataCommit?.repository.object.message}
                      </Text>
                    </Flex>
                    <Flex
                      gap='10px'
                      alignItems='center'>
                      <Text fontSize='xs'>
                        {dataCommit?.repository.object.abbreviatedOid}
                      </Text>
                      <Text fontSize='xs'>
                        {format(
                          new Date(
                            `${dataCommit?.repository.object.committedDate}`
                          ),
                          'MMMM dd, yyyy'
                        )}
                      </Text>
                      <Text
                        display='flex'
                        alignItems='center'
                        gap='5px'
                        fontSize='sm'>
                        <BiGitCommit size='16px' />
                        <Text fontWeight='semibold'>
                          {' '}
                          {dataCommit?.repository.object.history.totalCount}
                        </Text>
                        commits
                      </Text>
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

      {dataTree?.repository && (
        <AdditionalInformation data={dataTree?.repository} />
      )}
    </Grid>
  );
};
