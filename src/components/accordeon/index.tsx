import React from "react";

const Accordeon: React.FC<React.PropsWithChildren> = ({ children }) => {
    const childrenArray = Array.isArray(children) ? children : [children];

    return (
        <div>
            {...childrenArray}
        </div>
    );
};

export default Accordeon;