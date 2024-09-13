import {
    Box,
    Input,
    InputGroup,
    FormLabel,
    FormControl,
    Button,
    Text,
    InputLeftElement,
    IconButton,
    useToast
}from '@chakra-ui/react'
import {ViewIcon,ViewOffIcon} from '@chakra-ui/icons'
import { useState } from 'react'

async function callApi<Output>(patch:'user/login',method:'POST',data?:{[key:string]:string}):Promise<Output|null>;
async function callApi<Output>(patch:'user/login',method:'POST',data?:{[key:string]:string}){
    try{
        let response =await fetch('https://farawin.iran.liara.run/api/'+patch,{
            method,
            body:JSON.stringify(data)
        });
        return((await response.json())as Output)
    }
    catch(error){
        console.error(error);
    }
}

type props={
    onTokenChange:(token:string)=>void,
    onUsernameChange:(username:string)=>void
}
type responseApi={
    code:'200'|'400'|'401',
    message:string
}

const Login = (props:props) => {
    const toast = useToast()

    const [show, setShow] = useState(false)
    const handleClickShow = () => setShow(!show)

    
    const [username,setUesername] = useState('')
    const [password,setPassword] = useState('')

    

    const handleSetUsername = (event:any)=>{
        setUesername(event.target.value);
    }

    const handleSetPassword = (event:any)=>{
        setPassword(event.target.value);
    }

    const submitHandler =async () =>{
       const responseLogin =await callApi<responseApi&{token:string}>('user/login','POST',{'username':username,'password':password});
       if (responseLogin?.code == '200') {
        props.onTokenChange(responseLogin.token)
        props.onUsernameChange(username)
        toast({
            position: 'bottom',
            title: `${responseLogin?.message}`,
            status: 'success',
            isClosable: true,
          });
       }
       else{
        toast({
            position: 'bottom',
            title: `${responseLogin?.message}`,
            status: 'error',
            isClosable: true,
          });
       }
    };

    return <div>
        <Box bg={'#292F33'} display={'flex'} flexDirection={'column'} borderRadius={30} boxShadow={'5px 5px 10px #E1E8ED , -5px -5px 10px #55ACEE'} w={'100%'} h={'100%'} fontFamily={'Shabnam'} fontSize={20} >
            <Text fontSize={40} margin={30} color={'#55ACEE'}> 
                ورود
            </Text>
            <InputGroup display={'flex'} flexDirection={'column'} className='des-rtl' >
            <FormControl>
                <FormLabel paddingRight={5} fontSize={20} color={'#ffffff'}>
                    نام کاربری
                </FormLabel>
                <Input  value={username} className='inputVal' onChange={handleSetUsername} maxLength={11} pattern='09[0-9]{9}' type='text' color={'#66757F'} paddingRight={3} placeholder={'*********09'} bg={'#E1E8ED'} border={0}  w={'60%'} h={10} fontSize={15} borderRadius={20} />
            </FormControl>
            <FormControl>
            <FormLabel paddingRight={5} fontSize={20} color={'#ffffff'}>
                    رمز عبور
                </FormLabel>
                <Input value={password} onChange={handleSetPassword} maxLength={16} className='inputVal' minLength={8} type={show ? 'text' : 'password'} color={'#66757F'} paddingRight={3} placeholder={'شامل 8 حرف'} bg={'#E1E8ED'} border={0}  w={'60%'} h={10} fontSize={15} borderRadius={20}/>
                <InputLeftElement>
                    <IconButton variant='ghost' aria-label='Search database' icon={show?<ViewOffIcon/>:<ViewIcon/>} _active={{}} _hover={{}} _visited={{}} onClick={handleClickShow} border={0} bg={'transparent'} color={'#66757F'} className='pointer ' fontSize={20} top={9} left={90} />
                </InputLeftElement>
            </FormControl>
            <Text color={'#55ACEE'} fontSize={13} className='des-ltr pointer' margin={'10px 0'} pos={'relative'} right={20}>فراموشی رمز عبور</Text>
            <Button  type='submit' className='pointer' onClick={submitHandler} w={'40%'} h={10} marginTop={2} borderRadius={30} fontSize={20} border={0} bg={'#55ACEE'} right={'140px'} _hover={{
                background:'#ffffff', color:'#55ACEE'
            }} >ورود</Button>
            <Box display={'flex'} margin={'0 100px'}>
            <Text  margin={10} marginLeft={3} color={'#ffffff'}>هنوز عضو نشده ام</Text>
            <Text className='pointer' m={10} marginRight={0} fontSize={15} color={'#55ACEE'}>عضویت</Text>
            </Box>
            </InputGroup>
        </Box>
    </div>;
}


export default Login;