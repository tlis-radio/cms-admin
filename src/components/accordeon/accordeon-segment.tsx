import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import { Transition } from "@headlessui/react";

type AccordeonSegmentProps = {
    title: string;
    className?: string;
};

const AccordeonSegment: React.FC<AccordeonSegmentProps & React.PropsWithChildren> = ({
    title,
    children,
    className
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={className}>
            <div
                className="w-full border cursor-pointer text-white bg-slate-500 rounded-t-md px-4 py-2"
                onClick={toggle}
            >
                <span className="flex flex-row w-full justify-between items-center">
                    <p>{title}</p>
                    <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                </span>
            </div>
            <Transition
                show={isOpen}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="w-full border rounded-b-md px-4 py-2 flex flex-col gap-4">
                    { children }
                </div>
            </Transition>
        </div>
    );
};

export default AccordeonSegment;