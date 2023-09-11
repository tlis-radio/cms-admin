import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonProps = {
    label?: string;
    icon?: IconDefinition,
    onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, icon }) => {
    return (
        <button
            className='bg-slate-500 hover:bg-slate-700 cursor-pointer text-white font-bold py-2 px-4 rounded'
            onClick={onClick}
        >
            {icon && <FontAwesomeIcon icon={icon} /> }
            {label && label}
        </button>
    )
};

export default Button;