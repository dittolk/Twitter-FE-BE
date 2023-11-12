import axios from 'axios'
import { useEffect, useState } from 'react';

import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Flex,
    Link,
    Badge,
    useColorModeValue,
    useDisclosure,
    IconButton,
    Textarea,
  } from '@chakra-ui/react'

function UserList(){

    const [userList, setUserList] = useState([])

    const loadUser = async () =>{
        try{
            const response = await axios.get("http://localhost:2000/user/getall");
            setUserList(response.data);
        }catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        loadUser();
      }, [])

    return(
        <>        
        <Flex flexDirection={'column'} p={4}>
             {userList.map((item, index) => (
            <Box
                marginBottom={'2rem'}
                maxW={'320px'}
                w={'full'}
                bg='white'
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                name = {item.name}
                marginBottom={'1rem'}
                />
                <Heading color={'black'} fontSize={'2xl'} fontFamily={'body'}>
                {item.name}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                @{item.username}
                </Text>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                Referral: {item.referral}
                </Text>
                <Stack direction={'column'}>
                    <Text
                    textAlign={'center'}
                    color='black'
                    px={3}>
                    {item.bio}
                    </Text>
                </Stack>
                
                <Stack direction={'row'} spacing={4} mt={2} justifyContent={'space-around'}>
                    <Text fontWeight={600} color={'gray.500'} mb={4}>
                    Followers 3M
                    </Text>

                    <Text fontWeight={600} color={'gray.500'} mb={4}>
                    Following 2M
                    </Text>
                </Stack>

                <Stack mt={8} direction={'row'} spacing={4}>
                <Button
                    // onClick={handleFollow}
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
             ))}
            </Flex>
        </>
    )
}

export default UserList;