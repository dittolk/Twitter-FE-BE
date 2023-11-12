import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
  } from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

import React, { useRef, useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup"
import axios from 'axios';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setData } from '../redux/usersSlice';

function LoginBox() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const [showErrorOutline, setShowErrorOutline] = useState(false);
    const [username, setUsername] = useState(''); // State untuk menyimpan nama pengguna
    const [referralCode, setReferralCode] = useState('');
    const data_referral = useRef();

    const RegisterSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        username: Yup.string().required("Username is required"),
        email: Yup.string().email("Invalid address format").required("Email is required"),
        password: Yup.string().min(3, "Password must be 3 characters at minimum").required("Password is required"),
    });

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email("Invalid address format").required("Email is required"),
        password: Yup.string().min(3, "Password must be 3 characters at minimum").required("Password is required"),
    });

    const handleSubmitRegister = async (data) =>{
        data.referral = referralCode;
        console.log(data);
        try{
            const response = await axios.post("http://localhost:2000/user/register", data);
        }catch(err){
            console.log(err);
            alert("Error")
        }
    };

    const generateReferralCode = () => {
        // console.log(data_referral.current.value);
        if (data_referral.current.value.length >= 2) {
            
          // Ambil dua karakter pertama dari nama pengguna
          const words = data_referral.current.value.split(' ')
          const userChars = words
          .map((word) => word.charAt(0).toUpperCase())
            .join('');
    
          // Generate empat karakter acak untuk kode referal sisanya
          const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
    
          // Gabungkan karakter dari nama pengguna dan karakter acak
          const generatedCode = `${userChars}${randomChars}`;
    
          // Simpan kode referal yang dihasilkan
          setReferralCode(generatedCode);
        } else {
          alert('Nama pengguna harus memiliki minimal 2 karakter.');
        }
      };

    const handleSubmitLogin = async (data_input_property) => {
        try{
            console.log(data_input_property);
            const response = await axios.get(`http://localhost:2000/user/login?email=${data_input_property.email}&password=${data_input_property.password}`, data_input_property)
            console.log("ini response", response);
            console.log("ini token", response.data.token)
            console.log("Ini response.data.userLogin", response.data.userLogin);
            
            console.log("Ini length", response.data.userLogin.length); //undefined
            if(response.data.token){
                dispatch(setData(response.data.userLogin))
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard");
                window.location.reload();
            }else{
                toast({
                    title: 'Sorry',
                    description: "Email or Password is wrong. Please try again.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                  })
            }
        }catch(err){
            console.log(err);
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return(
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={'white'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Happening Now</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
                Join Today ✌️
            </Text>
            </Stack>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
                <Formik
                    initialValues={{email: "", password: ""}}
                    validationSchema={LoginSchema}
                    onSubmit={(values, action) => {
                        handleSubmitLogin(values);
                        action.resetForm();
                    }}>

                    {(props) =>{
                        return(
                            <Form>
                                <FormControl id="email">
                                    <FormLabel>Email address</FormLabel>
                                    <Field name="email">
                                        {({ field }) => <Input {...field} type="email" placeholder="Email"/>}
                                    </Field>
                                    <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                                 </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Field name="password">
                                        {({ field }) => <Input {...field} type="password" placeholder="Password" />}
                                    </Field>
                                    <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                                 </FormControl>
                                <Stack>
                                    <Stack
                                        direction={{ base: 'column', sm: 'row' }}
                                        align={'start'}
                                        justify={'space-between'}>
                                        <Checkbox>Remember me</Checkbox>
                                        <Text color={'blue.400'}>Forgot password?</Text>
                                    </Stack>
                                    <Button
                                        type='submit'
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                        bg: 'blue.500',
                                        }}>
                                        Sign in
                                    </Button>
                                    <Text>Don't have an account?</Text>
                                    <Button
                                        onClick={onOpen}
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                        bg: 'blue.500',
                                        }}>
                                        Create Account
                                    </Button>
                                 </Stack>
                            </Form>
                        )
                    }}
                </Formik>
            </Stack>
            </Box>
        </Stack>

        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            >
            <ModalOverlay />
            <ModalContent>
                <Formik
                    initialValues={{name:"", username:"", email: "", password: "", password_confirmation: "", bio:"Hey there! I'm using twitter."}}
                    validationSchema={RegisterSchema}
                    onSubmit={(values, action) => {
                        const {password_confirmation, ...formData} = values;
                        if (values.password !== values.password_confirmation) {
                            // Passwords don't match, set an error for confirmPassword field
                            setShowErrorOutline(true);
                            setTimeout(() => {
                                setShowErrorOutline(false);
                              }, 2000);
                            toast({
                                title: 'Error',
                                description: "Please re-type the correct password.",
                                status: 'error',
                                duration: 5000,
                                isClosable: true,
                                position: 'top',
                              })
                              action.setFieldValue('password', '')
                              action.setFieldValue('password_confirmation', '')
                          } else {
                            // Passwords match, proceed with form submission
                            handleSubmitRegister(formData);
                            action.resetForm();
                            toast({
                                title: 'Success',
                                description: "Your account has been created.",
                                status: 'success',
                                duration: 5000,
                                isClosable: true,
                                position: 'top',
                              })
                            onClose();
                          }
                    }}>

                    {(props) =>{
                        return(
                            <Form>
                                <ModalHeader>Create your account</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                        <FormControl>
                                            <FormLabel>Name</FormLabel>
                                            <Field name="name">
                                                {({ field }) => <Input {...field} type="text" placeholder="Your name" ref={data_referral}/>}
                                            </Field>
                                            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Username</FormLabel>
                                            <Field name="username">
                                                {({ field }) => <Input {...field} type="text" placeholder="Username" />}
                                            </Field>
                                            <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Email</FormLabel>
                                            <Field name="email">
                                                {({ field }) => <Input {...field} type="email" placeholder="Email" />}
                                            </Field>
                                            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                                        </FormControl>

                                        <FormControl mt={4}>
                                            <FormLabel>Password</FormLabel>
                                            <Field name="password">
                                                {({ field }) => <Input {...field} type="password" placeholder="Password" borderColor={showErrorOutline ? 'red.500' : undefined}/>}
                                            </Field>
                                            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Password Confirmation</FormLabel>
                                            <Field name="password_confirmation">
                                                {({ field }) => <Input {...field} type="password" placeholder="Re-type password" borderColor={showErrorOutline ? 'red.500' : undefined}/>}
                                            </Field>
                                            <ErrorMessage name="password_confirmation" component="div" style={{ color: 'red' }} />
                                        </FormControl>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={generateReferralCode} type='submit' colorScheme='blue' mr={3}>
                                        Create Account
                                    </Button>
                                <Button onClick={onClose}>Cancel</Button>
                                {/* <Button onClick={generateReferralCode}>Generate Referral</Button> */}
                                </ModalFooter>
                            </Form>
                        )
                    }}    
                </Formik>
            </ModalContent>
        </Modal>

        

        </Flex>
    )
}

export default LoginBox;