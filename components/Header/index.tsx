import Image from "next/image";
import logo from "../../public/images/netflix-logo.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserIcon, BellIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { navItems } from "../../common/constants";
import useAuth from "../../hooks/useAuth";

const Header:FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => logout();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll',handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return ( 
    <header className={ isScrolled ? 'bg-gray-900' : ''}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image src={logo} alt="Netflix" placeholder="blur" width={170} height={100} />
        <nav>
          <ul className="hidden space-x-4 md:flex">
            {navItems.map(item => (
              <li className="nav-link" key={item}>{item}</li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <UserIcon className="w-6 h-6" onClick={handleLogout}/>
        </Link>
      </div>
    </header>
  );
}
 
export default Header;