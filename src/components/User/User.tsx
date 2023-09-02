import { useQuery } from '@apollo/client'
import { GET_USER } from '../../endpoints/endpoint';

import { Flex, Text, Image } from '@chakra-ui/react'
import { IUser } from '../../utils/types/types';

export const User = () => {
    const login = "vladyslav-zolotarov";
    const { loading, error, data } = useQuery<IUser>(GET_USER, { variables: { login } });

    // console.log('data', data)
    // console.log('loading', loading)
    // console.log('error', error)

    if (loading) return <Text>Loading...</Text>

    if (error) return <Text>Error - {error.message}</Text>

    return (
        <Flex direction={'column'}>
            <Flex>
                <Image
                    rounded={'50%'}
                    boxSize='150px'
                    src={data?.user.avatarUrl}
                    alt={data?.user.name}
                />
            </Flex>
            <Text>{data?.user.name}</Text>
            <Text>{data?.user.login}</Text>
            <Text>{data?.user.bio}</Text>
            <Text>{data?.user.followers.totalCount} followers</Text>
            <Text>{data?.user.following.totalCount} following</Text>
            <Text>{data?.user.location}</Text>
            <Text>{data?.user.email}</Text>
            <Text>{data?.user.company}</Text>
        </Flex>

    );
};