import { Box, Button, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function NavBar(){
    const user = useSelector((state) => state.user.value);
    console.log(user);

    const navigate = useNavigate();
    // console.log(user.email);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    const handleProfile = () => {
        navigate('/profile');
    }

    const handleDashboard = () => {
        navigate('/dashboard');
    }

    return(
        <Flex w={'100%'} marginBottom={'2rem'}>
            <Box bg={'white'} w={'100%'} color='black' padding="1.2rem" borderBottom="1px solid black" boxShadow='0px 4px 2px -2px rgba(0, 0, 0, 0.2)' alignItems={'center'}>
                <Flex justifyContent="space-between" alignItems={'center'}>
                    <Button bg={'rgb(67, 204, 246)'} _hover={{bg: 'blue.500',}} color={'white'} onClick={handleDashboard}>Dashboard</Button>
                    <Text>Hello, {user.name}</Text>
                    <Input bg={'gray.100'} placeholder="Search tweets" w={'50%'}></Input>
                    <Stack direction={'row'} alignItems={'center'} spacing={5}>
                        <Button bg={'rgb(67, 204, 246)'} _hover={{bg: 'blue.500',}} color={'white'} onClick={handleLogout}>Logout</Button>
                        <Button bg={'rgb(67, 204, 246)'} _hover={{bg: 'blue.500',}} color={'white'} onClick={handleProfile}>Profile</Button>
                    </Stack>
                </Flex>
            </Box>
        </Flex>
    )
}

export default NavBar;