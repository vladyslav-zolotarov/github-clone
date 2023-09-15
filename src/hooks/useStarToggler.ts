import { useMutation } from '@apollo/client';
import { GET_REPOSITORY_INFO } from '../endpoints/queries';
import {
  ADD_STAR_MUTATION,
  REMOVE_STAR_MUTATION,
} from '../endpoints/mutations';

export const useStarToggler = () => {
  const [addStar, { loading: loadingAddStart, error: errorAddStart }] =
    useMutation(ADD_STAR_MUTATION, {
      refetchQueries: [GET_REPOSITORY_INFO],
      awaitRefetchQueries: true,
    });

  const [removeStar, { loading: loadingRemoveStart, error: errorRemoveStart }] =
    useMutation(REMOVE_STAR_MUTATION, {
      refetchQueries: [GET_REPOSITORY_INFO],
      awaitRefetchQueries: true,
    });

  const handleStarToggler = (
    starrableId: string,
    viewerHasStarred: boolean
  ) => {
    if (viewerHasStarred) {
      removeStar({ variables: { starrableId: starrableId } });
      return;
    }

    addStar({ variables: { starrableId: starrableId } });
  };

  return {
    handleStarToggler,
    loadingAddStart,
    loadingRemoveStart,
    errorAddStart,
    errorRemoveStart,
  };
};
