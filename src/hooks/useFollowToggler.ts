import {
  FOLLOW_USER_MUTATION,
  UNFOLLOW_USER_MUTATION,
} from '../endpoints/mutations';
import { GET_FOLLOWERS, GET_FOLLOWING } from '../endpoints/queries';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

export const useFollowToggler = () => {
  const [followUser, { loading: followLoading, error: followError }] =
    useMutation(FOLLOW_USER_MUTATION, {
      refetchQueries: [GET_FOLLOWERS, GET_FOLLOWING],
      awaitRefetchQueries: true,
    });
  const [unfollowUser, { loading: unfollowLoading, error: unfollowError }] =
    useMutation(UNFOLLOW_USER_MUTATION, {
      refetchQueries: [GET_FOLLOWERS, GET_FOLLOWING],
      awaitRefetchQueries: true,
    });

  const [clickedBtnId, setclickedBtnId] = useState<string>();

  const handleFollowToggler = (userId: string, isFollowing: boolean) => {
    setclickedBtnId(userId);

    if (isFollowing) {
      unfollowUser({ variables: { userId: userId } });
      return;
    }

    followUser({ variables: { userId: userId } });
  };

  return {
    clickedBtnId,
    followLoading,
    unfollowLoading,
    followError,
    unfollowError,
    handleFollowToggler,
  };
};
