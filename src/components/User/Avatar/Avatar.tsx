import { Avatar as ChakraAvatar } from '@chakra-ui/react';

interface AvatarProps {
  size?: string;
  name: string;
  src: string;
}

export const Avatar = ({ size, name, src }: AvatarProps) => {
  return (
    <ChakraAvatar
      size={`${size ? size : 'xs'}`}
      name={name}
      src={src}
    />
  );
};
