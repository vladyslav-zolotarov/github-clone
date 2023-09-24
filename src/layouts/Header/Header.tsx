import { Flex } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { Navigation, HeaderTopBelt } from '../../components';
import { GET_USER_INFO_FOR_NAVIGATION } from '../../endpoints/queries';
import { IUserInfoForNavigation } from '../../utils/types/types';
import { useParams } from 'react-router-dom';

export const Header = () => {
  const { userLogin } = useParams();

  const { data, loading, error } = useQuery<IUserInfoForNavigation>(
    GET_USER_INFO_FOR_NAVIGATION,
    {
      variables: { login: userLogin },
    }
  );

  if (loading) return null;

  if (error) return null;

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
      {data && (
        <>
          <HeaderTopBelt user={data?.user} />
          <Navigation user={data?.user} />
        </>
      )}
    </Flex>
  );
};
