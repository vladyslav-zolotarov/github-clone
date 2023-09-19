import { DocumentNode } from 'graphql';
import { useMutation } from '@apollo/client';
import {
  ADD_STAR_MUTATION,
  REMOVE_STAR_MUTATION,
} from '../endpoints/mutations';

export const useStarToggler = ({
  endpointQueryUpdate,
}: {
  endpointQueryUpdate: DocumentNode | undefined;
}) => {
  const [addStar, { loading: loadingAddStart, error: errorAddStart }] =
    useMutation(ADD_STAR_MUTATION, {
      refetchQueries: endpointQueryUpdate ? [endpointQueryUpdate] : [],
      awaitRefetchQueries: true,
    });

  const [removeStar, { loading: loadingRemoveStart, error: errorRemoveStart }] =
    useMutation(REMOVE_STAR_MUTATION, {
      refetchQueries: endpointQueryUpdate ? [endpointQueryUpdate] : [],
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
