import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { IRepositoryInfo } from '../../utils/types/types';
import { GET_REPOSITORY_INFO } from '../../endpoints/endpoint';
import { ReadMe, FileItem, FolderItem } from './index';
import {
  Text,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
} from '@chakra-ui/react';

export const RepositoryItem = () => {
  const { userLogin, repositoryName } = useParams();

  const { data, loading, error } = useQuery<IRepositoryInfo>(
    GET_REPOSITORY_INFO,
    {
      variables: { name: repositoryName, owner: userLogin },
    }
  );

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error - {error.message}</Text>;

  console.log('data', data);

  const RepositoryReadMeFile = data?.repository.object.entries.filter(
    rep => rep.extension === '.md'
  );

  const RepositoryFolders = data?.repository.object.entries.filter(
    rep => rep.extension === ''
  );

  const RepositoryFiles = data?.repository.object.entries.filter(
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
          <Thead>
            <Tr>
              <Td padding='10px 20px'>
                <Flex>Test</Flex>
              </Td>
            </Tr>
          </Thead>
          <Tbody>
            {RepositoryFolders?.map(folder => {
              return (
                <Tr>
                  <Td padding='10px 20px'>
                    <FolderItem
                      key={folder.name}
                      data={folder}
                    />
                  </Td>
                </Tr>
              );
            })}
            {RepositoryFiles?.map(file => {
              return (
                <Tr>
                  <Td padding='10px 20px'>
                    <FileItem
                      key={file.name}
                      data={file}
                    />
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
