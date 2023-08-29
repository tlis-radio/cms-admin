'use client';
import Image from 'next/image'
import logo from '../../public/tlis-WS-black.png';
import { useUser } from '@auth0/nextjs-auth0/client';
import { faPersonRunning, faDoorOpen, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
    const { user } = useUser();

    return (
        <nav className='bg-white flex p-4 items-center justify-between fixed w-full'>
            <span className='sm:hidden text-xl'><FontAwesomeIcon icon={faBars} /></span>
            <span className='flex flex-row items-center gap-4'>
                <Image
                    src={logo}
                    alt="Logo"
                    height={40}
                    priority={true}
                />
                <span className='hidden sm:flex sm:flex-row gap-2'><p className='font-semibold'>TLIS on you!</p>{user?.nickname}</span>
            </span>
            <a
                className='flex gap-2 border p-1 rounded-md text-xl text-red-400 border-red-400 hover:text-white hover:bg-red-400'
                href='/api/auth/logout'
            >
                <FontAwesomeIcon icon={faPersonRunning} />
                <FontAwesomeIcon icon={faDoorOpen} />
            </a>
        </nav>
    )
}

export default Navbar;