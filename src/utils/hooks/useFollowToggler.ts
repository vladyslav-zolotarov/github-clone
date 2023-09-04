import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {
  FOLLOW_USER,
  GET_FOLLOWERS,
  UNFOLLOW_USER,
} from '../../endpoints/endpoint';

export const useFollowToggler = () => {
  const [followUser, { loading: followLoading, error: followError }] =
    useMutation(FOLLOW_USER, {
      refetchQueries: [GET_FOLLOWERS],
      awaitRefetchQueries: true,
    });
  const [unfollowUser, { loading: unfollowLoading, error: unfollowError }] =
    useMutation(UNFOLLOW_USER, {
      refetchQueries: [GET_FOLLOWERS],
      awaitRefetchQueries: true,
    });

  const [clickedBtnId, setclickedBtnId] = useState<number>();

  const handleFollowToggler = (
    index: number,
    userId: string,
    isFollowing: boolean
  ) => {
    setclickedBtnId(index);

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
