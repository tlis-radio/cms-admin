import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { useRouter } from 'next/navigation';

type SidebarLinkProps = {
    icon: IconProp,
    redirectUrl: string
    isActive: boolean
}

const SidebarLink: FunctionComponent<SidebarLinkProps> = ({ icon, redirectUrl, isActive }) => {
    const { push } = useRouter();

    return (
        <span
            className={`sm:px-6 py-2 flex gap-2 items-center justify-center sm:rounded-md sm:hover:bg-slate-700 ${isActive ? "bg-slate-700 text-white" : ""} sm:hover:text-white cursor-pointer`}
            onClick={() => push(redirectUrl)}
        >
            <FontAwesomeIcon icon={icon} className="text-xl"/>
        </span>
    );
};

export default SidebarLink;