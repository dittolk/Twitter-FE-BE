import { Box, Button, Flex, Input, Text, Avatar } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Timeline() {
    const [tweets, setTweets] = useState([])
    const token = localStorage.getItem("token");
    const tweetRef = useRef();
    const user = useSelector((state) => state.user.value);
    console.log("Data tweets", tweets);

    const loadTweets = async () =>{
        try{
            const response = await axios.get("http://localhost:2000/tweet/get-tweet", {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              });
            console.log("ini tweet", response);
            setTweets(response.data);
        }catch(err){
            console.log(err);
        }
    };

    const handlePostTweets = async () => {
        try{
            const response = await axios.post("http://localhost:2000/tweet/post-tweet", {id: user.id, tweet: tweetRef.current.value}, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              });
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        loadTweets();
      }, [])

    return(
        <>
        <Flex flexDirection={'column'}>
            <Flex flexDirection={'row'} p={4}>
                <Input ref={tweetRef} w={'80%'} bg={'gray.100'} placeholder="Post tweet" marginBottom={'2rem'} marginRight={'2rem'}></Input>
                <Button
                onClick={handlePostTweets}
                flex={1}
                fontSize={'sm'}
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
                Tweet
                 </Button>
            </Flex>
            <Flex flexDirection={'column'}>
                {tweets.map((item, index) =>(
                    <Box border={'1px solid grey'} p={6} w={'100vh'}>
                        <Avatar name={item.User.name}/>
                        <Text>
                            <strong>@{item.User.username}</strong><br/>
                            {item.tweet}<br/>
                            <br/>
                        </Text>
                    </Box>
                ))}
            </Flex>
        </Flex>   
        </>
    )
}

export default Timeline;