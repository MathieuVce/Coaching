import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link, Outlet } from 'react-router-dom';
import {selectUser,setUser} from "./store/user"
import { GiHamburgerMenu } from "react-icons/gi"
import { MdClose } from "react-icons/md"

// function App() {
//   const user = useSelector(selectUser)
//   const dispatch = useDispatch()
  
//   return (
//     // <main>
//     //   <p>Coaching</p>
//     //   <p>{user ? user.name : "No user created"}</p>
//     //   <button className='rounded-md bg-gray-400 p-3' onClick={()=>dispatch(setUser({name:"Loic"}))}>Create user</button>
//     // </main>
//     <Login></Login>
//   )
// }

const App: React.FunctionComponent = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return(
      <>
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue mb-3">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start">
              <div
                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              >
                <Link to="/">
                  <img className='h-7' src={"src/assets/longlogo.svg"}/>
                </Link>
              </div>
              <button
                className="text-blue-light cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                {navbarOpen ?
                  <MdClose color='white' size={22}/>
                :
                  <GiHamburgerMenu color='white'/>
                }
              </button>
            </div>
            <div
              className={
                "lg:flex flex-grow items-center" +
                (navbarOpen ? " flex" : " hidden")
              }
              id="example-navbar-danger"
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <Link to="/login">Login</Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <Link to="/register">Register</Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Outlet />
      </>
  );

      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </main> */}

};

export default App
