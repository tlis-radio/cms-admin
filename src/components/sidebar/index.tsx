import { faUsers, faBullhorn, faFilm, faPhotoFilm, faMask, faMaskFace, faMasksTheater, faTheaterMasks } from '@fortawesome/free-solid-svg-icons';
import SidebarLink from "./sidebar-link";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'

const routes = [
    {
        icon: faFilm,
        redirectUrl: '/management/broadcast'
    },
    {
        icon: faBullhorn,
        redirectUrl: '/management/shows'
    },
    {
        icon: faUsers,
        redirectUrl: '/management/users'
    }
];

const Sidebar = () => {
    const pathname = usePathname()

    const createSidebarLinks = () => {
        return routes.map((route, index) => {
            return (
                <SidebarLink key={index} icon={route.icon} redirectUrl={route.redirectUrl} isActive={pathname === route.redirectUrl} />
            );
        });
    }

    return (
        <aside className="flex flex-col bg-white border border-slate-100 absolute left-0 w-[50px] sm:w-[80px] top-[70px] h-[calc(100vh-70px)] justify-between">
            <div className="flex flex-col items-center gap-4 mt-4">
                {createSidebarLinks()}
            </div>
        </aside>
    );
}

export default Sidebar;
