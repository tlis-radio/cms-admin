import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { useRouter } from 'next/navigation';

type SidebarLinkProps = {
    icon: IconProp,
    redirectUrl: string
}

const SidebarLink: FunctionComponent<SidebarLinkProps> = ({ icon, redirectUrl }) => {
    const { push } = useRouter();

    return (
        <span
            className="px-6 py-2 flex gap-2 items-center justify-center m-2 rounded-md hover:bg-slate-700 hover:text-white cursor-pointer"
            onClick={() => push(redirectUrl)}
        >
            <FontAwesomeIcon icon={icon} className="text-xl"/>
        </span>
    );
};

export default SidebarLink;