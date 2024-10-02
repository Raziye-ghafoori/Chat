import {
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
}from '@chakra-ui/react'
import { useState ,  useEffect ,useRef} from "react";
import {DeleteIcon,EditIcon } from '@chakra-ui/icons';

type ChatList ={
    receiver:string,
    text: string,
    date: string,
    sender: string,
    id: number
  }

  type Contact={
    username:string,
    name:string,
    ref:string,
    date:string
}

const week =[
    'دوشنبه',
    'سه شنبه',
    'چهارشنبه',
    'پنج شنبه',
    'جمعه',
    'شنبه',
    'یک شنبه'
]

const miladiToSular = (date:string)=>{
    let time = new Date(date).getDay();
    return week[time-1]
}


const showBox=async(allListChat:Promise<ChatList[]|undefined>,contactInfo:Contact|undefined)=>{
    const listChats = await allListChat;
    
    const listShow = listChats?.map(chat => (
        chat.sender == contactInfo?.username && chat.receiver == contactInfo.ref  || chat.receiver == contactInfo?.username && chat.sender == contactInfo.ref ? 
        chat.receiver == contactInfo.ref?
        <div key={chat.id}>
            <Popover  placement='right'>
                <PopoverTrigger>
                    <Box display={'flex'} justifyContent={"space-between"} alignItems={'center'}  background={'#66757F'} borderRadius={'10px 10px 10px 0'} w={'40%'} padding={5} m={8} marginLeft={3}>
                        <div style={{width:'150px',textAlign:'left'}}> {chat.text} </div><em style={{fontSize:'8px'}} >{miladiToSular(chat.date)}</em>
                    </Box>
                </PopoverTrigger>
                <PopoverContent zIndex={'-1'}  w={'40px'}  background={'#9ac0de'} >
                    <PopoverArrow />
                    <PopoverBody borderRadius={20} fontSize={10} background={'#9ac0de'} color={'black'} p={0} display={'flex'}>
                        <IconButton   variant='ghost' aria-label='Search database' icon={<DeleteIcon/>} color={'#ffffffff'} className='pointer' _hover={{}} _visited={{}} _active={{}} />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            
        </div>:<div key={chat.id} style={{display:"flex",margin:'0',justifyContent:'flex-end'}}>
        <Popover  placement='left' >
                <PopoverTrigger  >
                <Box display={'flex'} justifyContent={"space-between"} alignItems={'center'} background={'#55ACEE'} borderRadius={'10px 10px 0 10px'} w={'40%'} padding={5} m={'20px'} marginLeft={3}>
                <em style={{fontSize:'8px'}}>{miladiToSular(chat.date)}</em> <div style={{width:'150px',textAlign:'right'}}> {chat.text} </div>
                </Box>
                </PopoverTrigger>
                <PopoverContent zIndex={'-1'} w={'80px'}  background={'#9ac0de'} >
                    <PopoverArrow  background={'#9ac0de'}  />
                    <PopoverBody borderRadius={20} fontSize={10} background={'#9ac0de'} color={'black'} p={0} display={'flex'}>
                        <IconButton variant='ghost' aria-label='delete database' icon={<DeleteIcon/>} color={'#ffffffff'} className='pointer' _hover={{}} _visited={{}} _active={{}}  />
                        <IconButton  variant='ghost' aria-label='Search database' icon={<EditIcon/>} color={'#ffffffff'} className='pointer' _hover={{}} _visited={{}} _active={{}}  />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </div>:<></>
    ));

    return listShow;

}

const MessageShow =  (props:{allListChat:Promise<ChatList[]|undefined>,contactInfo:Contact|undefined}) => {
    const [boxsOfMessage, setBoxsofmessage] = useState<JSX.Element[]>([]);

    

    useEffect(() => {
        const fetchMessages = async () => {
            const messages = await showBox(props.allListChat,props.contactInfo);
            setBoxsofmessage(messages || []);
        };
        fetchMessages();
    }, [props.allListChat]);

    return <div style={{overflowY:'scroll'}} >
        {boxsOfMessage}
        </div>;
}
export default MessageShow;