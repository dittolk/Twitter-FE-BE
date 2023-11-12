import { Box, Button, Flex, Image, Input, Text, useColorModeValue } from "@chakra-ui/react";
import LoginBox from "../components/login_box";

function Home() {
    
    return(
        <Flex bg={'white'} width={'100%'} height={'100%'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
                <Image src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1.png" boxSize='27%' objectFit='cover'></Image>
                <LoginBox></LoginBox>    
        </Flex>
    )
}

export default Home;