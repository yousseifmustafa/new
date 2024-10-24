import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';


 export const ycontext =createContext();



 

export default function Ycontext( {children}) {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();

  return (<ycontext.Provider value={{token,setToken,userName, setUserName,email, setEmail}}>
      {children}
    </ycontext.Provider>
  )
}



