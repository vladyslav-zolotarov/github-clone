import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

interface UserState {
  login: string;
  repositoriesCount: number;
  starsCount: number;
  followersCount: number;
  followingCount: number;
  pinnedRepositoriesCount: number;

  setLogin: (login: string) => void;
  setRepositoriesCount: (repositoriesCount: number) => void;
  setStarsCount: (starsCount: number) => void;
  setFollowersCount: (followersCount: number) => void;
  setFollowingCount: (followingCount: number) => void;
  setPinnedRepositoriesCount: (pinnedRepositoriesCount: number) => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      combine(
        {
          login: '',
          repositoriesCount: 0,
          starsCount: 0,
          followersCount: 0,
          followingCount: 0,
          pinnedRepositoriesCount: 0,
        },
        set => ({
          setLogin: login => set(() => ({ login: login })),

          setRepositoriesCount: repositoriesCount =>
            set(() => ({ repositoriesCount: repositoriesCount })),

          setStarsCount: starsCount => set(() => ({ starsCount: starsCount })),

          setFollowersCount: followersCount =>
            set(() => ({ followersCount: followersCount })),

          setFollowingCount: followingCount =>
            set(() => ({ followingCount: followingCount })),

          setPinnedRepositoriesCount: pinnedRepositoriesCount =>
            set(() => ({ pinnedRepositoriesCount: pinnedRepositoriesCount })),
        })
      ),
      { name: 'userStore' }
    )
  )
);

export default useUserStore;
