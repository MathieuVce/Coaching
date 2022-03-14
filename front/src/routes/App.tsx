import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi"
import { MdClose } from "react-icons/md"

const App: React.FunctionComponent = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return(
      <>
        <nav className="sticky top-0 z-100 flex flex-wrap items-center justify-between py-3 bg-blue">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
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
};

export default App
