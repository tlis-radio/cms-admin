import { faUsers, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import SidebarLink from "./sidebar-link";

const Sidebar = () => {
    return (
        <aside className="flex flex-col bg-white border border-slate-100 absolute left-0 w-[80px] top-[70px] h-[calc(100vh-70px)] justify-between">
            <div className="flex flex-col">
                <SidebarLink icon={faBullhorn} redirectUrl='/management/shows'/>
                <SidebarLink icon={faUsers} redirectUrl='/management/users' />
            </div>
        </aside>
    );
}

export default Sidebar;
