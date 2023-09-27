import { Flex } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { Navigation, HeaderTopBelt } from '../../components';
import { GET_USER_INFO_FOR_NAVIGATION } from '../../endpoints/queries';
import { IUserInfoForNavigation } from '../../utils/types/types';
import { useParams } from 'react-router-dom';

export const HeaderLayout = () => {
  const { userLogin } = useParams();

  const { data } = useQuery<IUserInfoForNavigation>(
    GET_USER_INFO_FOR_NAVIGATION,
    {
      variables: { login: userLogin },
    }
  );

  return (
    <Flex
      w='full'
      direction='column'
      margin='auto'
      maxW='1920px'
      padding='10px 50px 0'
      borderBottom='1px'
      borderColor='blackAlpha.300'
      backgroundColor='blackAlpha'>
      <HeaderTopBelt />
      <Navigation user={data?.user} />
    </Flex>
  );
};
