import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";

type SidebarLinkProps = {
    icon: IconProp
}

const SidebarLink: FunctionComponent<SidebarLinkProps> = ({ icon }) => {
    return (
        <span className="px-6 py-2 flex gap-2 items-center justify-center m-2 rounded-md hover:bg-slate-700 hover:text-white cursor-pointer">
            <FontAwesomeIcon icon={icon} className="text-xl"/>
        </span>
    );
};

export default SidebarLink;