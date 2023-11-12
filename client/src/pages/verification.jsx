import { Button, Center } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Verification() {
    
    const params = useParams()
    console.log("ini token", params.token);

    const handleVerify = async () => {
        try{
            const response = await axios.patch("http://localhost:2000/user/verify", {}, {
                headers: {
                  Authorization: `Bearer ${params.token}`,
                }
              });
        }catch(err){
            console.log(err);
            alert("Error")
        }
    }

    return(
        <>
            <Center>
                <Button colorScheme='teal' onClick={handleVerify}>Verify</Button>
            </Center>
        </>
    )
}

export default Verification;