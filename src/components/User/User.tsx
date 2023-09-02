import { useQuery } from '@apollo/client'
import { GET_USER } from '../../endpoints/endpoint';
import { Link } from 'react-router-dom'
import { Heading, Flex, Text, Image, Highlight } from '@chakra-ui/react'
import { IUser } from '../../utils/types/types';
import { FiUsers } from 'react-icons/fi'
import { BsDot } from 'react-icons/bs'
import { BiMap } from 'react-icons/bi'
import { FiMail } from 'react-icons/fi'


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
                    boxSize='260px'
                    src={data?.user.avatarUrl}
                    alt={data?.user.name}
                />
            </Flex>
            <Flex direction='column' mb='20px'>
                <Heading size='md'>{data?.user.name}</Heading>
                <Text fontSize='xl' color='blackAlpha.700'>{data?.user.login}</Text>
            </Flex>

            <Text mb='20px'>{data?.user.bio}</Text>

            <Flex mb='20px'>
                <Link to={`/user/${login}/followers`}>
                    <Flex gap='4px' alignItems='center'>
                        <FiUsers fontSize='15px' />
                        <Text display='flex' fontSize='sm'>{data?.user.followers.totalCount}
                            <Text ml='4px' color='blackAlpha.700'>followers</Text>
                        </Text>
                    </Flex>
                </Link>

                <Flex alignItems='center'>
                    <BsDot fontSize='15px' />
                    <Text display='flex' fontSize='sm'>{data?.user.following.totalCount}
                        <Text ml='4px' color='blackAlpha.700'>following</Text>
                    </Text>
                </Flex>
            </Flex >

            <Flex alignItems='center'>
                <BiMap fontSize='18px' />
                <Text ml='5px'>{data?.user.location}</Text>
            </Flex>
            <Flex alignItems='center'>
                <FiMail fontSize='18px' />
                <Text ml='5px'>{data?.user.email}</Text>
            </Flex>
            <Text>{data?.user.company}</Text>
        </Flex >

    );
};