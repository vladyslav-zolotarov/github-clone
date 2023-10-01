import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../endpoints/queries';
import { Link as RouterDomLink, useParams } from 'react-router-dom';
import { Heading, Flex, Text, Button, Avatar, Link } from '@chakra-ui/react';
import { IUser } from '../../../utils/types/queryTypes';
import { BiLink, BiLogoLinkedinSquare, BiLogoTwitter } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdMailOutline } from 'react-icons/md';
import { PiUsersBold } from 'react-icons/pi';
import { LuBuilding } from 'react-icons/lu';
import { UserAvatar, Status } from '../../../components';
import { UserSkeleton } from '..';

export const User = () => {
  const { userLogin } = useParams();

  const { loading, error, data } = useQuery<IUser>(GET_USER, {
    variables: { login: userLogin },
  });

  if (loading) return <UserSkeleton />;

  if (error) return <Text>Error - {error.message}</Text>;

  return (
    <Flex direction='column'>
      {data ? (
        <>
          <Flex
            mb='20px'
            position='relative'>
            <>
              <UserAvatar
                height='260px'
                width='260px'
                name={data?.user.name}
                src={data?.user.avatarUrl}
              />
              {data.user.id && data.user.status && data.user.isViewer ? (
                <Status
                  id={data.user.id}
                  status={data.user.status}
                  isViewer={data.user.isViewer}
                />
              ) : null}
            </>
          </Flex>

          <Flex
            direction='column'
            gap='5px'
            mb='20px'>
            {data.user.name ? (
              <Heading
                size='md'
                fontWeight='bold'>
                {data.user.name}
              </Heading>
            ) : null}
            <Flex
              alignItems='center'
              color='blackAlpha.700'>
              {data.user.login ? (
                <Text
                  fontSize='md'
                  fontWeight='medium'>
                  {data.user.login}
                </Text>
              ) : null}
              {data.user.pronouns ? (
                <>
                  <BsDot fontSize='15px' />
                  <Text
                    fontSize='md'
                    fontWeight='medium'>
                    {data.user.pronouns}
                  </Text>
                </>
              ) : null}
            </Flex>
          </Flex>

          {data.user.bio ? (
            <Text
              mb='20px'
              fontSize='md'
              fontWeight='medium'>
              {data.user.bio}
            </Text>
          ) : null}

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
                  {data.user.followers.totalCount
                    ? data.user.followers.totalCount
                    : 0}
                  <Text
                    as='span'
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
                  {data.user.following.totalCount
                    ? data.user.following.totalCount
                    : 0}
                  <Text
                    as='span'
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
            gap='5px'
            mb='20px'>
            {/* Company */}
            {data.user.company ? (
              <Flex
                gap='5px'
                alignItems='center'
                color='blackAlpha.700'>
                <LuBuilding fontSize='17px' />
                <Text
                  fontSize='15px'
                  fontWeight='medium'
                  color='blackAlpha.900'>
                  {data.user.company}
                </Text>
              </Flex>
            ) : null}

            {/* Location */}
            {data.user.location ? (
              <Flex
                gap='5px'
                alignItems='center'
                color='blackAlpha.700'>
                <HiOutlineLocationMarker fontSize='17px' />
                <Text
                  fontSize='15px'
                  fontWeight='medium'
                  color='blackAlpha.900'>
                  {data.user.location}
                </Text>
              </Flex>
            ) : null}
            {data.user.email ? (
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
                    {data.user.email}
                  </Text>
                </Flex>
              </Link>
            ) : null}

            {data.user.websiteUrl ? (
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
                    {data.user.websiteUrl}
                  </Text>
                </Flex>
              </Link>
            ) : null}

            {/* Social media links (twitter,linkedin) */}
            {data.user.socialAccounts.edges.length
              ? data.user.socialAccounts.edges.map(item => {
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
                })
              : null}
          </Flex>

          {data.user.organizations.edges ? (
            <Flex
              direction='column'
              paddingTop='20px'
              borderTop='1px solid'
              borderColor='blackAlpha.100'>
              <Heading
                as='h2'
                mb='10px'
                size='sm'>
                Organizations
              </Heading>
              <Flex gap='5px'>
                {data.user.organizations.edges.map(item => {
                  return (
                    <RouterDomLink to={`/organization/${item.node.login}/`}>
                      <Avatar
                        size='sm'
                        src={item.node.avatarUrl}
                      />
                    </RouterDomLink>
                  );
                })}
              </Flex>
            </Flex>
          ) : null}
        </>
      ) : null}
    </Flex>
  );
};
