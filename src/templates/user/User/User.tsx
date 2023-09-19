import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../endpoints/queries';
import { Link as RouterDomLink, useParams } from 'react-router-dom';
import { Heading, Flex, Text, Link, Button } from '@chakra-ui/react';
import { IUser } from '../../../utils/types/types';
import { BiLink, BiLogoLinkedinSquare, BiLogoTwitter } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdMailOutline } from 'react-icons/md';
import { PiUsersBold } from 'react-icons/pi';
import { LuBuilding } from 'react-icons/lu';
import { Avatar, Status } from '../../../components';

export const User = () => {
  const { userLogin } = useParams();

  const { loading, error, data } = useQuery<IUser>(GET_USER, {
    variables: { login: userLogin },
  });

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error - {error.message}</Text>;

  return (
    <Flex direction='column'>
      <Flex
        mb='20px'
        position='relative'>
        {data && (
          <>
            <Avatar
              size='full'
              name={data.user.name}
              src={data.user.avatarUrl}
            />
            <Status status={data.user.status} />
          </>
        )}
      </Flex>

      <Flex
        direction='column'
        mb='20px'>
        <Heading
          size='md'
          fontWeight='bold'>
          {data?.user.name}
        </Heading>
        <Flex
          alignItems='center'
          color='blackAlpha.700'>
          <Text
            fontSize='md'
            fontWeight='medium'>
            {data?.user.login}
          </Text>

          {data?.user.pronouns && (
            <>
              <BsDot fontSize='15px' />
              <Text
                fontSize='md'
                fontWeight='medium'>
                {data?.user.pronouns}
              </Text>
            </>
          )}
        </Flex>
      </Flex>

      {data?.user.bio && (
        <Text
          mb='20px'
          fontSize='md'
          fontWeight='medium'>
          {data?.user.bio}
        </Text>
      )}

      <Button
        mb='20px'
        variant='outline'
        size='sm'>
        Edit profile
      </Button>

      {/* Followers and following */}
      <Flex mb='20px'>
        <Link
          as={RouterDomLink}
          to={`/user/${userLogin}/followers`}>
          <Flex
            gap='4px'
            alignItems='center'
            color='blackAlpha.700'>
            <PiUsersBold fontSize='17px' />
            <Text
              display='flex'
              fontSize='sm'
              fontWeight='medium'
              color='blackAlpha.900'>
              {data?.user.followers.totalCount}
              <Text
                ml='4px'
                color='blackAlpha.700'>
                followers
              </Text>
            </Text>
          </Flex>
        </Link>
        <Link
          as={RouterDomLink}
          to={`/user/${userLogin}/following`}>
          <Flex
            alignItems='center'
            color='blackAlpha.700'>
            <BsDot fontSize='18px' />
            <Text
              display='flex'
              fontSize='sm'
              fontWeight='medium'
              color='blackAlpha.900'>
              {data?.user.following.totalCount}
              <Text
                ml='4px'
                color='blackAlpha.700'>
                following
              </Text>
            </Text>
          </Flex>
        </Link>
      </Flex>

      {/* User info */}
      <Flex
        direction='column'
        gap='5px'>
        {/* Company */}
        {data?.user.company && (
          <Flex
            gap='5px'
            alignItems='center'
            color='blackAlpha.700'>
            <LuBuilding fontSize='17px' />
            <Text
              fontSize='15px'
              fontWeight='medium'
              color='blackAlpha.900'>
              {data?.user.company}
            </Text>
          </Flex>
        )}

        {/* Location */}
        {data?.user.location && (
          <Flex
            gap='5px'
            alignItems='center'
            color='blackAlpha.700'>
            <HiOutlineLocationMarker fontSize='17px' />
            <Text
              fontSize='15px'
              fontWeight='medium'
              color='blackAlpha.900'>
              {data?.user.location}
            </Text>
          </Flex>
        )}
        {data?.user.email && (
          <Link href={`mailto:${data?.user.email}`}>
            <Flex
              gap='5px'
              alignItems='center'
              color='blackAlpha.700'>
              <MdMailOutline fontSize='17px' />
              <Text
                fontSize='15px'
                fontWeight='medium'
                color='blackAlpha.900'>
                {data?.user.email}
              </Text>
            </Flex>
          </Link>
        )}

        {data?.user.websiteUrl && (
          <Link href={data?.user.websiteUrl}>
            <Flex
              gap='5px'
              alignItems='center'
              color='blackAlpha.700'>
              <BiLink fontSize='17px' />
              <Text
                fontSize='15px'
                fontWeight='medium'
                color='blackAlpha.900'>
                {data?.user.websiteUrl}
              </Text>
            </Flex>
          </Link>
        )}

        {/* Social media links (twitter,linkedin) */}
        {data?.user.socialAccounts.edges.length &&
          data?.user.socialAccounts.edges.map(item => {
            const currentSocialIcon =
              item.node.provider === 'TWITTER' ? (
                <BiLogoTwitter fontSize='17px' />
              ) : (
                <BiLogoLinkedinSquare fontSize='17px' />
              );

            return (
              <Link
                key={item.node.url}
                href={item.node.url}>
                <Flex
                  gap='5px'
                  alignItems='center'
                  color='blackAlpha.700'>
                  {/* <BiLink fontSize='17px' /> */}
                  {currentSocialIcon}
                  <Text
                    fontSize='15px'
                    fontWeight='medium'
                    color='blackAlpha.900'>
                    {item.node.displayName}
                  </Text>
                </Flex>
              </Link>
            );
          })}
      </Flex>
    </Flex>
  );
};
