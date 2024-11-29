import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {

  const[loggedInUser, setLoggedInUser] = useState<string | null>(null);
  useEffect(()=>{
    setLoggedInUser(sessionStorage.getItem("loggedInUser"));
  },[]);

  const handleClick = () =>{
    sessionStorage.removeItem("loggedInUser");

    setLoggedInUser(null);
  }

  return (
    <header className="p-1 mb-0 border-bottom ">

      <div className="flex items-start">
                <Image
                    src="/images/Logo.png"
                    alt="mediAssist-logo"
                    width={200}
                    height={200}
                    className="ml-4"
                />
            </div>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-3 text-blue">
          Home
        </Link>
        <Link href="/doctors" className="nav-link px-4 fs-3 text-blue">
          Doctors
        </Link>
        <Link href="/appointments" className="nav-link px-4 fs-3 text-blue">
          Appointments
        </Link>
        {!loggedInUser &&
        (<Link
           href= "/login"
          className="nav-link px-4 fs-3 text-blue hover:bg-gray-600 rounded-lg"
          >
           Login
        </Link>
        )}
        {loggedInUser && 
          <a
          href= "/login"
          onClick={handleClick}
          className="nav-link px-4 fs-3 text-blue hover:bg-gray-600 rounded-lg"
          >
            Logout
          </a>
          }
          {loggedInUser &&<div className="nav-link px-4 fs-3 text-blue">
            Welcome, {loggedInUser}!
          </div>}
      </nav>
    </header>
  );
};

export default Header;
