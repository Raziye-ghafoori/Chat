import SearchBar from './SearchBar'
import MassageHome from './MassageHome'
import { useState } from 'react';



async function callApi<Output>(patch:'contact',method:'GET',token:string):Promise<Output|null>;
async function callApi<Output>(patch:'chat',method:'GET',token:string):Promise<Output|null>;
async function callApi<Output>(patch:'contact'|'chat',method:'GET',token:string){
    try{
        let response =await fetch('https://farawin.iran.liara.run/api/'+patch,{
            method,
            headers:{authorization:token+''}
        });
        return((await response.json())as Output)
    }
    catch(error){
        console.error(error);
    }
}



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


type responseApi={
    code:'200'|'400',
    message:string
}

const getContact = async (token:string) =>{
    const responseContact = await callApi<responseApi&{contactList:Contact[]}>('contact','GET',token);
    if (responseContact?.code=='200') {
      const {contactList} = responseContact;
      return contactList ;
    } 
  }

  const getAllChats = async (token:string)=>{
    const responseGetChat = await callApi<responseApi&{chatList:ChatList[]}>('chat','GET',token);
    if(responseGetChat?.code=='200'){
        const {chatList} = responseGetChat;
        return chatList
    }
    
  }

const Home = (props:{token:string,username:string}) => {
    const contactList = getContact(props.token);
    const allListChat = getAllChats(props.token);
    const [chatInfo,setChatInfo]= useState<Contact | undefined>();


    const handlerSetChatInfo = (e:Contact)=>{
        if (e!==undefined) {
            setChatInfo(e);
        }
    }

    const messageHome = <MassageHome  contactInfo={chatInfo} token={props.token} />;

    return <div  className='flex fd-rowR al-it-c'>
        <SearchBar  token={props.token} contactlist={contactList} username={props.username} onCilckGetChatInfo={handlerSetChatInfo} allListChat={allListChat}/>
        {chatInfo!==undefined?messageHome:''}
        
    </div>;
}

export default Home;