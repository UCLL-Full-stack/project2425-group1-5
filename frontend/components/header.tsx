import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
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
      </nav>
    </header>
  );
};

export default Header;
