import { Badge as ChakraBadge, Text } from '@chakra-ui/react';

export const Badge = ({ visibility }: { visibility: string }) => {
  return (
    <ChakraBadge
      variant='outline'
      colorScheme='blackAlpha'
      borderRadius='20px'
      padding='1px 8px'
      color='blackAlpha.700'>
      <Text
        fontSize='10px'
        textTransform='lowercase'>
        {visibility}
      </Text>
    </ChakraBadge>
  );
};
