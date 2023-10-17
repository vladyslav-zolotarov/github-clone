import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { CommitCard } from '../../../components';
import { GET_REPOSITORY_COMMIT_LIST } from '../../../endpoints/queries';
import { IRepositoryCommitList } from '../../../utils/types/queryTypes';
import { Grid } from '@chakra-ui/react';

export const CommitList = () => {
  const { userLogin, repositoryName } = useParams();

  const { data, loading, error } = useQuery<IRepositoryCommitList>(
    GET_REPOSITORY_COMMIT_LIST,
    {
      variables: { name: repositoryName, owner: userLogin },
    }
  );

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error...</h1>;

  return (
    <div>
      <Grid gap='20px'>
        CommitList
        {data?.repository.object.history.edges.map(element => {
          return <CommitCard node={element.node} />;
        })}
      </Grid>
    </div>
  );
};
