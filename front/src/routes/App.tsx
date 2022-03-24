import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi"
import { MdClose } from "react-icons/md"
import longlogo from "../assets/longlogo.svg"


const App: React.FunctionComponent = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const location = useLocation();
  
  return(
      <>
        <nav className="sticky top-0 z-100 flex flex-wrap items-center justify-between py-3 bg-blue">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start">
              <div
                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              >
                <Link to="/">
                  <img className='h-7' src={longlogo}/>
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
        {location.pathname === '/' ?
        <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-blue to-blue-light">
          <div className=" bg-white rounded-md shadow-xl py-24 px-16 max-w-md lg:max-w-3xl md:max-w-2xl sm:max-w-md">
            <section className="flex flex-col items-center">
              <article className="flex flex-row">
                <h1 className="font-bold text-primary text-8xl 2xl:text-9xl xl:text-9xl lg:text-8xl sm:text-8xl">
                  W<span className="text-blue">e</span>llc<span className="text-blue">o</span>m<span className="text-blue">e</span>
                </h1>
              </article>
              <h6 className="mb-8 text-2xl font-bold text-center md:text-3xl">
                  to the Coaching Movie
              </h6>
              <p className="text-center text-brown md:text-lg">
                A private dashboard for the biggest movie's database !
              </p>
            </section>
          </div>
        </div>
        :
        <Outlet />
        }
      </>
  );
};

export default App
