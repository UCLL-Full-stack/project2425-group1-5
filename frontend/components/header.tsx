import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Language from './language/Language';
import { User } from '@/types';

const Header: React.FC = () => {

  const[loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")!))
  }, []);
  const handleClick = () =>{
    localStorage.removeItem("loggedInUser");

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
          {/* Home */}
          {t('login.header.nav.home')}
        </Link>
        <Link href="/doctors" className="nav-link px-4 fs-3 text-blue">
          {/* Doctors */}
          {t('login.header.nav.doctors')}
        </Link>
        <Link href="/appointments" className="nav-link px-4 fs-3 text-blue">
          {/* Appointments */}
          {t('login.header.nav.appointments')}
        </Link>
        {!loggedInUser &&
        (<Link
           href= "/login"
          className="nav-link px-4 fs-3 text-blue hover:bg-gray-600 rounded-lg"
          >
           {/* Login */}
           {t('login.header.nav.login')}
        </Link>
        )}
        {loggedInUser && 
          <a
          href= "/login"
          onClick={handleClick}
          className="nav-link px-4 fs-3 text-blue hover:bg-gray-600 rounded-lg"
          >
            {/* Logout */}
            {t('login.header.nav.logout')}
          </a>
          }
          {loggedInUser &&
          <div className="nav-link px-4 fs-3 text-blue">
            {/* Welcome, {loggedInUser}! */}
                        {`${t("login.header.welcome")}, ${loggedInUser?.name || ""}!`}
          </div>}
          <Language/>
      </nav>
    </header>
  );
};

export default Header;
