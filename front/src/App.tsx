import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {selectUser,setUser} from "./store/user"
function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  
  return (
    <main>
      <p>Coaching</p>
      <p>{user ? user.name : "No user created"}</p>
      <button className='rounded-md bg-gray-400 p-3' onClick={()=>dispatch(setUser({name:"Loic"}))}>Create user</button>
    </main>
  )
}

export default App
