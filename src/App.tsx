
// import { useState } from 'react'
import './App.css'
import Home from './component/Home';
import Login from './component/Login'
import { useState } from 'react'






function App() {
  const [token,setToken]=useState('');
  const [username,setUesername]=useState('');

  const handlerSetToken = (e:string)=>{
    setToken(e)
  }

  const handlerSetUsername = (e:string)=>{
    setUesername(e)
  }

  const login=(<div className='flex f-jc-Sa top-200 al-it-c'>
    <Login onTokenChange={handlerSetToken} onUsernameChange={handlerSetUsername}/>
  </div>)

  const home = (<div>
    <Home token={token} username={username}/>
    </div>)

  return (token==''?login:home)
}

export default App
