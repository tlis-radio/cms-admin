import { FunctionComponent } from "react";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type InputErrorProps = {
    error?: string;
}

const InputError: FunctionComponent<InputErrorProps> = ({error}) => {
    return (
        <span className="flex flex-row gap-2 items-center text-red-500 text-xs">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <p className="italic">{error}</p>
        </span>
    );
};

export default InputError;