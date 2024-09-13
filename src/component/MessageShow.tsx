import {
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
}from '@chakra-ui/react'
import { useState ,  useEffect } from "react";

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
                    <Box display={'flex'} justify-content={"space-between"} align-items={'center'} background={'#66757F'} borderRadius={10} w={'30%'} padding={3} m={8} marginLeft={3}>
                        <strong>{chat.sender}:</strong> {chat.text} <em>{miladiToSular(chat.date)}</em>
                    </Box>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>ادیت پیام</PopoverBody>
                </PopoverContent>
            </Popover>
            
        </div>:<div key={chat.id}>
        <Popover placement='right' >
                <PopoverTrigger >
                <Box display={'flex'} justifyContent={"space-between"} alignItems={'center'} background={'#55ACEE'} borderRadius={10} w={'30%'} padding={3} m={8} marginLeft={3}>
                    {chat.text} <em style={{fontSize:'8px'}}>{miladiToSular(chat.date)}</em>
                </Box>
                </PopoverTrigger>
                <PopoverContent w={'80px'}  background={'#9ac0de'} >
                    <PopoverArrow  background={'#9ac0de'} />
                    <PopoverBody borderRadius={20} fontSize={10} background={'#9ac0de'} color={'black'} ><a>edite</a><br></br><a>delete</a></PopoverBody>
                </PopoverContent>
            </Popover>
            
        </div>:<div></div>
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