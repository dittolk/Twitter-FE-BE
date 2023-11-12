import { Box, Button, Center, Flex, Image, Input, Square, Text, Textarea, useColorModeValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/navbar";
import UserList from "../components/user_list";
import Timeline from "../components/timeline";

function Dashboard() {
    const user = useSelector((state) => state.user.value);
    
    return(
        <Flex bg={'white'} width={'100%'} height={'100%'} flexDirection={'column'} justifyContent={'space-around'} alignItems={'center'}>
            <NavBar></NavBar>
            <Flex w={'100%'} color='black'>
                <Center w='200px'>
                    <Text>Sidebar</Text>
                </Center>
                <Flex w='130vh' bg='white' justifyContent={'center'} p={5}>
                    <Timeline></Timeline>
                </Flex>
                <Box flex='1'>
                    <UserList></UserList>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Dashboard;