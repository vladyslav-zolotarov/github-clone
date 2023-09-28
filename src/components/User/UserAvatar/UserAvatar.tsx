import { Avatar as ChakraAvatar } from '@chakra-ui/react';

interface AvatarProps {
  height?: string;
  width?: string;
  size?: string;
  name?: string;
  src?: string;
}

export const UserAvatar = ({ width, height, size, name, src }: AvatarProps) => {
  return (
    <ChakraAvatar
      width={width}
      height={height}
      size={size}
      name={name}
      src={src}
    />
  );
};
