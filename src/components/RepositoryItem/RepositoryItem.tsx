import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { IRepositoryInfo } from '../../utils/types/types';
import { GET_REPOSITORY_INFO } from '../../endpoints/endpoint';
import { Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css';

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

  return (
    <div>
      RepositoryItem
      <div>
        {data?.repository.object.entries.map(rep => {
          if (rep.extension === '.md') {
            console.log('ex', rep.extension);
            return (
              <div
                className='markdown-body'
                key={rep.name}>
                <ReactMarkdown className='markdown'>
                  {rep.object.text}
                </ReactMarkdown>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
