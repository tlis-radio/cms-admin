import React from "react";

type AccordeonProps = {
    className?: string;
};

const Accordeon: React.FC<AccordeonProps & React.PropsWithChildren> = ({ children, className }) => {
    const childrenArray = Array.isArray(children) ? children : [children];

    return (
        <div className={className}>
            {...childrenArray}
        </div>
    );
};

export default Accordeon;