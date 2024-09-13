import { Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    FormControl,
    FormLabel,
    ModalBody,
    Button,
    useDisclosure,
    InputGroup,
    InputLeftElement,
    Stack,
    Card,
    CardBody,
    Box, 
    Heading,
    Text, 
    Wrap, 
    WrapItem, 
    Avatar,
    IconButton,
    useToast,
} from '@chakra-ui/react'
import {useState,useRef,useEffect} from 'react';
import {SearchIcon,AddIcon} from '@chakra-ui/icons';


const week =[
    'دوشنبه',
    'سه شنبه',
    'چهارشنبه',
    'پنج شنبه',
    'جمعه',
    'شنبه',
    'یک شنبه'
]


type Contact={
    username:string,
    name:string,
    ref:string,
    date:string
}

type ChatList ={
    receiver:string,
    text: string,
    date: string,
    sender: string,
    id: number
  }


const SearchBar = (props:{token:string,contactlist:Promise<Contact[]|undefined>,username:string,onCilckGetChatInfo:(contact:Contact)=>void,allListChat:Promise<ChatList[]|undefined>}) => {
    const toast = useToast();
    const [nameSearch ,SetNameSearch] = useState('');
    const { isOpen:isOpenSearch, onOpen:onOpenSearch, onClose:onCloseSearch } = useDisclosure()
    const initialRef = useRef(null);
    const [nameContact,setNameContact]= useState('');
    const [numberContact,setNumbertContact]= useState('');
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [listSearch, setListSearch] = useState<Contact[]>([]);
    const [listShow,setListShow] = useState<JSX.Element[]>([]);
    

    const handlerInput =(event:any)=>{
        SetNameSearch(event.target.value);
    }

    const handleSearch = () => {
        contacts.forEach(contact=>{
            if(contact.name.includes(nameSearch)){
                setListSearch(prevState => [...prevState,contact])
            }
        })

        useEffect(() => {
            const fetchMessages = async () => {
                const contact = await maping(listSearch)
                setListShow(contact || []);
            };
            fetchMessages();
        }, [props.allListChat]);
         
    };

    const handlerSetName = (event:any)=>{
        setNameContact(event.target.value);
    }

    const handlerSetNumber = (event:any)=>{
        setNumbertContact(event.target.value);
    }

    const handleContactClick =(contact:Contact)=>{
        props.onCilckGetChatInfo(contact);
    }

    const handleAddcontact = async () => {
        props.contactlist.then(list=>{
           const contact = list?.find(el=>{
                return el.username == numberContact && el.name == nameContact && props.username == el.ref
            })
            if(contact){
                setContacts(prevState => [...prevState, contact]);
            }else{
                toast({
                    position: 'bottom',
                    title: `مخاطب پیدا نشد`,
                    status: 'error',
                    isClosable: true,
                  });
                return;
            }
            
        })
        onCloseSearch();
    };

    const miladiToSular = (date:string)=>{
        let time = new Date(date).getDay();
        return week[time-1]
    }

    const maping = async (list:Contact[])=>{
        const chatList = await props.allListChat;
        let date:string = '';
        let message:string = 'پیامی وجود ندارد';
        return list.map(contact=>{
           chatList?.forEach(chat=>{
            if (chat.receiver == contact.username && chat.sender == props.username
                || 
                chat.receiver == props.username && chat.sender == contact.username
            ){
                date=miladiToSular(chat.date);
                message= chat.text
            }
           })
            
            return(<Card onClick={()=>handleContactClick(contact)} className='pointer' bg={'transparent'} boxShadow={0} p={1}>
                        <CardBody  borderRadius={'50px'} _hover={{background:'#ffffff1e'}} p={1}>
                        <Box  paddingRight={2} display={'flex'} flexDirection={'column'}>
                            <Box display={'flex'} flexDirection={'row-reverse'} justifyContent={''}>
                            <Wrap justifyContent='flex-end'>
                                <WrapItem>
                                    <Avatar name={contact?.name} bg='#55ACEE' borderRadius={100} w={10} h={10} m={3}/>
                                </WrapItem>
                            </Wrap>
                        <Heading size='xs' marginTop={10} fontSize={16}>
                            {contact?.name}
                        </Heading>
                        </Box>
                        <Box display={'flex'} flexDirection={'row-reverse'} justifyContent={'space-between'}>
                
                        <Text overflow={'hidden'} color={'#E1E8ED'}  fontWeight={'bold'} size='xs' fontSize={12} pt={5} p={5}>
                            {message}
                            </Text>
                            <Text color={'#292F33'} fontWeight={'bold'} size='xs' fontSize={12} pt={5} p={5}>
                            {date}
                            </Text>
                            </Box>
                        </Box>
                        </CardBody>
                        </Card>)
    
        })
    }
    
    
    useEffect(() => {    
        const fetchMessages = async () => {
            const contact = await maping(contacts)
            setListShow(contact || []);
        };
        fetchMessages();
    }, [contacts]); 

    return (
        <div className='w-30 p-l-4p p-t-3p' >
            <Stack  spacing={3} align="left" display={'flex'} >
            <InputGroup  size='md' className='h-40p' >
            <Input
                borderRadius={20}
                className='css-1n0hj84-new w-100 no-b h-100 bg-CCD6DD des-rtl c-292F33 Fs-20'
                size='md'
                pr='4.5rem'
                type='text'
                placeholder='جستجو'
                value={nameSearch}
                variant='flushed'
                onChange={handlerInput}
                _hover={{
                    boxShadow:'1px 1px 10px #55ACEE'
                }}
                />
            <InputLeftElement width='4.5rem'>
            <IconButton  variant='ghost' aria-label='Search database' icon={<SearchIcon />} onClick={handleSearch} className='pointer j_c m-8p no-b no-bg c-292F33 w-100 Fs-25 ' _hover={{}} _visited={{}} _active={{}}  />
            </InputLeftElement>
            <Button onClick={onOpenSearch} _hover={{
                boxShadow:'1px 1px 10px #55ACEE'
            }} borderRadius={20} marginLeft={2} p={0} marginRight={2} className= 'j_c c-292F33  bg-CCD6DD no-b Fs-25 ' >
            <IconButton  variant='ghost' aria-label='Add database' icon={<AddIcon/>} className='pointer' w={0}  _hover={{}} _visited={{}} _active={{}} />
            </Button>
                <Modal 
                    initialFocusRef={initialRef}
                    isOpen={isOpenSearch}
                    onClose={onCloseSearch}   
                >
                    <ModalOverlay />
                    <ModalContent boxShadow={'5px 5px 10px #55ACEE ,-5px -5px 10px #CCD6DD'}  bg={'#292F33'} w={500} h={350} borderRadius={30} border='2px solid #E1E8ED' className='c-55ACEE' >
                    <ModalHeader className='f-Shabnam des-rtl' textAlign={'center'}  fontSize={20} p={2}>اضافه کردن مخاطب</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                        <FormLabel className='des-rtl f-Shabnam' fontSize={25}  textAlign={'right'} >نام</FormLabel>
                        <Input value={nameContact}  onChange={handlerSetName} marginLeft={100} ref={initialRef} borderRadius={20}  placeholder='نام مخاطب'className='des-rtl bg-CCD6DD no-b' color={'#292F33'} w='50%' h={30} />
                        </FormControl>

                        <FormControl mt={4}>
                        <FormLabel className='des-rtl f-Shabnam' textAlign={'right'} fontSize={25}>شماره تلفن</FormLabel>
                        <Input value={numberContact} onChange={handlerSetNumber} marginLeft={100}  placeholder='تلفن مخاطب' borderRadius={20} className='des-rtl bg-CCD6DD no-b'  w='50%' color={'#292F33'} h={30}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter display={'flex'} justifyContent={'center'} flexDirection={'row-reverse'} p={2}>
                        <Button onClick={handleAddcontact} colorScheme='blue' className='pointer no-b f-Shabnam' w={50} h={10} bg={'#55ACEE'} color={'#292F33'} borderRadius={20} _hover={{border:'#CCD6DD solid 3px'}} mr={3}>
                        ذخیره
                        </Button>
                        <Button m={5} onClick={onCloseSearch} className='pointer no-b f-Shabnam'  w={50} h={10} bg={'#CCD6DD'} color={'#292F33'} borderRadius={20} _hover={{border:'red solid 3px'}}>لغو</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
        </InputGroup>
        <Box overflowY={'scroll'}  id='list-contacts' display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} p={0} h={620}>
        {listShow}
        </Box>
            </Stack> 
        </div>
    );
}

export default SearchBar;