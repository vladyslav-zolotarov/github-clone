import { Flex, Text, Button, Skeleton } from '@chakra-ui/react';
import { BiLink } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { LuBuilding } from 'react-icons/lu';
import { MdMailOutline } from 'react-icons/md';
import { PiUsersBold } from 'react-icons/pi';
import { UserAvatar } from '../../../components';

export const UserSkeleton = () => {
  return (
    <Flex direction='column'>
      <Flex
        mb='20px'
        position='relative'>
        <>
          <UserAvatar
            height='260px'
            width='260px'
          />
        </>
      </Flex>

      <Flex
        direction='column'
        gap='5px'
        mb='20px'>
        <Skeleton
          height='18px'
          width='100%'
        />
        <Flex
          alignItems='center'
          color='blackAlpha.700'>
          <Skeleton
            height='15px'
            width='100%'
          />
        </Flex>
      </Flex>

      <Skeleton
        mb='20px'
        height='15px'
        width='100%'
      />

      <Button
        mb='20px'
        variant='outline'
        size='sm'>
        Edit profile
      </Button>

      {/* Followers and following */}
      <Flex mb='20px'>
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
            0
            <Text
              as='span'
              ml='4px'
              color='blackAlpha.700'>
              followers
            </Text>
          </Text>
        </Flex>

        <Flex
          alignItems='center'
          color='blackAlpha.700'>
          <BsDot fontSize='18px' />
          <Text
            display='flex'
            fontSize='sm'
            fontWeight='medium'
            color='blackAlpha.900'>
            0
            <Text
              as='span'
              ml='4px'
              color='blackAlpha.700'>
              following
            </Text>
          </Text>
        </Flex>
      </Flex>

      {/* User info */}
      <Flex
        direction='column'
        gap='5px'>
        {/* Company */}
        <Flex
          gap='5px'
          alignItems='center'
          color='blackAlpha.700'>
          <LuBuilding fontSize='17px' />
          <Skeleton
            height='13px'
            width='100%'
          />
        </Flex>

        {/* Location */}
        <Flex
          gap='5px'
          alignItems='center'
          color='blackAlpha.700'>
          <HiOutlineLocationMarker fontSize='17px' />
          <Skeleton
            height='13px'
            width='100%'
          />
        </Flex>

        <Flex
          gap='5px'
          alignItems='center'
          color='blackAlpha.700'>
          <MdMailOutline fontSize='17px' />
          <Skeleton
            height='13px'
            width='100%'
          />
        </Flex>

        <Flex
          gap='5px'
          alignItems='center'
          color='blackAlpha.700'>
          <BiLink fontSize='17px' />
          <Skeleton
            height='13px'
            width='100%'
          />
        </Flex>

        {/* Social media links (twitter,linkedin) */}
        <Skeleton
          height='13px'
          width='100%'
        />
      </Flex>
    </Flex>
  );
};
