'use client'
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  useDisclosure,
  IconButton,
  Textarea,
} from '@chakra-ui/react'

import { EditIcon } from '@chakra-ui/icons'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'


import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

export default function AccountProfile() {
    const user = useSelector((state) => state.user.value);
    console.log(user);
    const [arrFollower, setArrFollowers] = useState([])
    const id = localStorage.getItem("id");
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bioRef = useRef();
    const token = localStorage.getItem("token");

    const handleDeleteAccount = async (data) =>{
        try{
            const response = await axios.delete(`http://localhost:2000/users/delete-account`, {id: user.id}, {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
            localStorage.removeItem("id")
            navigate("/");
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    };

    const handleUpdateBio = async () => {
        try{
            const response = await axios.patch(`http://localhost:2000/users/${id}`, {bio: bioRef.current.value})
            onClose();
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    const handleFollow = async () => {
        const newElement = ''
        setArrFollowers(prevArray => [...prevArray, newElement])
        //user.followers_list = nama1;
       
        try{
            const response = await axios.patch(`http://localhost:2000/users/${id}`, {followers_list: arrFollower})
            // window.location.reload();
        }catch(err){

        }
    }

  return (
    <>
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
        color={'black'}>
        <Avatar
          name = {user.name}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {user.name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          @{user.username}
        </Text>
        <Stack direction={'column'}>
            <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            {user.bio}<br/>
            </Text>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
                Referral: {user.referral}
            </Text>
            <IconButton onClick={onOpen} aria-label='Edit Bio' icon={<EditIcon/>}></IconButton>
        </Stack>
        
          <Stack direction={'row'} spacing={4} mt={2} justifyContent={'space-around'}>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
            {/* Followers {user.followers_list.length} */}
            </Text>

            <Text fontWeight={600} color={'gray.500'} mb={4}>
            {/* Following {user.following_list.length} */}
            </Text>
          </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            onClick={handleDeleteAccount}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Delete Account
          </Button>
          <Button
            onClick={handleFollow}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Follow
          </Button>
        </Stack>
      </Box>
    </Center>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Bio</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea ref={bioRef}>

            </Textarea>
          </ModalBody>
        
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleUpdateBio} >Edit</Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}