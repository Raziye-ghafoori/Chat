import {
    Card,
    CardBody,
    Box,
    Wrap,
    WrapItem,
    Avatar,
    Heading,
    IconButton,
    Input,
    Stack,
    InputGroup,
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    ModalFooter,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useToast
} from '@chakra-ui/react'
import {DeleteIcon,HamburgerIcon,ArrowUpIcon,ExternalLinkIcon,EditIcon} from '@chakra-ui/icons'
import {useRef, useState} from 'react';
import MessageShow from './MessageShow';

type Contact={
    username:string,
    name:string,
    ref:string,
    date:string
}

type Chat ={
    receiver:string,
    text:string,
    date:string,
    sender:string,
    id:number
}

const mounths =[
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
]

type responseApi={
    code:'200'|'400',
    message:string
}

type ChatList ={
    receiver:string,
    text: string,
    date: string,
    sender: string,
    id: number
  }


async function callApi<Output>(patch:'chat',method:'POST',token:string,body?:{[key:string]:string}):Promise<Output|null>;
async function callApi<Output>(patch:'chat',method:'PUT',token:string,body?:{[key:string]:string}):Promise<Output|null>;
async function callApi<Output>(patch:'chat',method:'DELETE',token:string,body?:{[key:string]:string}):Promise<Output|null>;
async function callApi<Output>(patch:'chat',method:'POST'|'PUT'|'DELETE',token:string,body?:{[key:string]:string}){
    try{
        
        let response =await fetch(`https://farawin.iran.liara.run/api/${patch}`,{
            method,
            headers:{authorization:token+''},
            body:body?JSON.stringify(body):null
        });
        return((await response.json())as Output)
    }
    catch(error){
        console.error(error);
    }
}


const MassageHome = (props:{contactInfo:Contact|undefined,token:string,allListChat:Promise<ChatList[]|undefined>}) => {
    const { isOpen:isEditOpen, onOpen:onEditOpen, onClose:onEditClose } = useDisclosure()
    const { isOpen:isDeleteOpne, onOpen:onDeleteOpen, onClose:onDeleteClose } = useDisclosure()
    const initialRefEdit = useRef(null)
    const toast = useToast();
    const dateNow = new Date();

    const [textChat,setTextChat]=useState('');

    const handlerSetTextChat = (e:any)=>{
        setTextChat(e.target.value)
    }

    const handlerSendMessage =async ()=>{
       const responsePostChat=await callApi<responseApi&{chat:Chat}>('chat','POST',props.token,{contactUsername:props.contactInfo!.username,textHtml:textChat});
       if(responsePostChat?.code=='200'){
        toast({
            position: 'bottom',
            title: `پیام با موفقیت ارسال شد`,
            status: 'success',
            isClosable: true,
          });
       }
       else{
       }
    }

    const handlerEditeMessage =async ()=>{
        const responsePutChat=await callApi<responseApi&{chat:Chat}>('chat','POST',props.token,{id:'',textHtml:textChat});
        if(responsePutChat?.code=='200'){
         console.log(responsePutChat.chat)
        }
     }

     const handlerDeleteMessage =async ()=>{
        const responseDeleteChat=await callApi<responseApi>('chat','POST',props.token,{id:''});
        if(responseDeleteChat?.code=='200'){
         console.log(responseDeleteChat.code)
        }
     }

     const showTime = ()=>{
        const mounth = dateNow.getMonth();
        const day = dateNow.getDate()
        return `${mounths[mounth]} ${day}`
     }

    return <div className='w-100'>
        <Card  p={0}  w={'100%'}>
                <CardBody bg={'#66757F'} p={'14px'} boxShadow={'-2px -2px 6px #55ACEE inset'}>
                <Box display={'flex'} flexDirection={'column'}>
                    <Box display={'flex'} flexDirection={'row-reverse'} justifyContent={'space-between'} >
                    <Box display={'flex'} flexDirection={'row-reverse'}> 
                    <Wrap justifyContent='flex-end'>
                        <WrapItem>
                            <Avatar m={2} name={props.contactInfo?.name} bg='#292F33'color={'#55ACEE'} borderRadius={100} w={10} h={10}/>
                        </WrapItem>
                    </Wrap>
                    <Box>
                    <Heading  p={2} size='xs' fontSize={20}>
                    {props.contactInfo?.name}
                    </Heading>
                    <Text fontSize={10} textAlign={'right'}>{props.contactInfo?.username}</Text>
                    </Box>
                    </Box>
                    <Menu>
                        <MenuButton
                            color={'#ffffff'}
                            className=' pointer'
                            fontSize={25}
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                            border={0}
                            _hover={{background:'#55ACEE'}}
                            _active={{}}
                        />
                        <MenuList bg={'transparent'} border={0}>
                            <MenuItem bg={'#55ACEE'} className='no-b pointer' _hover={{background:'#CCD6DD',color:'#55ACEE'}} borderRadius={'10px 10px 0 0'} fontSize={15} onClick={onDeleteOpen} icon={<DeleteIcon/>} >
                            حذف مخاطب
                            </MenuItem>
                            <MenuItem bg={'#55ACEE'} className='no-b pointer' _hover={{background:'#CCD6DD',color:'#55ACEE'}} fontSize={15}  onClick={onEditOpen} icon={<EditIcon />}>
                            ویرایش مخاطب
                            </MenuItem>
                            <MenuItem bg={'#55ACEE'} className='no-b pointer' _hover={{background:'#CCD6DD',color:'#55ACEE'}} fontSize={15} borderRadius={'0 0 10px 10px'}  icon={<ExternalLinkIcon />} >
                            خروج از چت
                            </MenuItem>
                        </MenuList>
                        </Menu>
                        <Modal 
                        initialFocusRef={initialRefEdit}
                        isOpen={isEditOpen}
                        onClose={onEditClose}   
                        >
                            <ModalOverlay />
                            <ModalContent  boxShadow={'5px 5px 10px #CCD6DD ,-5px -5px 10px #55ACEE'}  bg={'#292F33'} w={500} h={350} borderRadius={30} border='2px solid #E1E8ED' className='c-55ACEE' >
                            <ModalHeader className='f-Shabnam des-rtl' textAlign={'center'}  fontSize={20}>ویرایش مخاطب</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6} p={0} paddingRight={5}>
                                <FormControl>
                                <FormLabel className='des-rtl f-Shabnam' fontSize={25} textAlign={'right'} >نام</FormLabel>
                                <Input paddingRight={10} marginLeft={100} borderRadius={20}  placeholder='نام مخاطب'className='des-rtl bg-CCD6DD no-b' color={'#292F33'} w='50%' h={30} />
                                </FormControl>

                                <FormControl mt={4}>
                                <FormLabel className='des-rtl f-Shabnam'  textAlign={'right'} fontSize={25}>شماره تلفن</FormLabel>
                                <Input  marginLeft={100} paddingRight={10} placeholder='تلفن مخاطب' borderRadius={20} className='des-rtl bg-CCD6DD no-b'  w='50%' color={'#292F33'} h={30}/>
                                </FormControl>
                            </ModalBody>

                            <ModalFooter  display={'flex'} justifyContent={'center'}  flexDirection={'row-reverse'}>
                                <Button  colorScheme='blue' className='pointer no-b f-Shabnam' w={50} h={10} bg={'#55ACEE'} color={'#292F33'} borderRadius={20} _hover={{border:'#CCD6DD solid 3px'}} mr={3}>
                                ذخیره
                                </Button>
                                <Button m={5} onClick={onEditClose} className='pointer no-b f-Shabnam'  w={50} h={10} bg={'#CCD6DD'} color={'#292F33'} borderRadius={20} _hover={{border:'red solid 3px'}}>لغو</Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                <Modal 
                    initialFocusRef={initialRefEdit}
                    isOpen={isDeleteOpne}
                    onClose={onDeleteClose}   
                >
                    <ModalOverlay />
                    <ModalContent  boxShadow={'5px 5px 10px red ,-5px -5px 10px #CCD6DD'}  bg={'#292F33'} w={400} h={200} borderRadius={30} border='2px solid #E1E8ED' className='c-55ACEE' >
                    <ModalCloseButton />
                    <ModalBody pb={6} p={0}>
                        <Text fontFamily={'Shabnam'} fontSize={25} marginLeft={20} marginTop={10}>
                            ??آیا مایل به حذف مخاطب هستید
                        </Text>
                    </ModalBody>

                    <ModalFooter display={'flex'} justifyContent={'center'} flexDirection={'row-reverse'}>
                        <Button  colorScheme='blue' className='pointer no-b f-Shabnam' w={50} h={10} bg={'red'} color={'#CCD6DD'} borderRadius={20} _hover={{border:'#CCD6DD solid 3px'}} mr={3}>
                        بلی
                        </Button>
                        <Button m={5} onClick={onDeleteClose} className='pointer no-b f-Shabnam'  w={50} h={10} bg={'#CCD6DD'} color={'#292F33'} borderRadius={20} _hover={{border:'#55ACEE solid 3px'}}>خیر</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
                    </Box>
                </Box>
                </CardBody>
            </Card>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} bg={'#292F33'} boxShadow={'2px 2px 1px #55ACEE inset,-2px -2px 1px #55ACEE inset'} h={610}>
                {showTime()}
                <MessageShow allListChat={props.allListChat} contactInfo={props.contactInfo}/>
                <Stack  spacing={3}  >
            <InputGroup top={-10} right={3} flexDirection={'row-reverse'} justifyContent={'center'} size='md' className='h-40p' >
            <Input
                borderRadius={'0 20px 20px 0'}
                w={'90%'}
                className='css-1n0hj84-new no-b h-100 bg-E1E8ED des-rtl c-292F33 Fs-20'
                size='md'
                type='text'
                placeholder=' پیام خود را ارسال کنید ' 
                variant='flushed'
                bg={'#CCD6DD'}
                boxShadow={'1px 1px 5px #FFFFFF'}
                _hover={{
                    boxShadow:'1px 1px 5px #55ACEE'
                }}
                onChange={handlerSetTextChat}
                />
                <Box bg={'#CCD6DD'} boxShadow={'1px 1px 5px #FFFFFF'}  _hover={{
                    boxShadow:'1px 1px 5px #55ACEE'
                }} borderRadius={'20px 0 0 20px'}
                >
                <IconButton onClick={handlerSendMessage} fontSize={20} variant='ghost' aria-label='send data'  icon={<ArrowUpIcon/>} _hover={{}} _visited={{}} _active={{}}/>
                </Box>
                </InputGroup>
                </Stack>
                </Box>
    </div>;
}

export default MassageHome;