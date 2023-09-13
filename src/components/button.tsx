import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonProps = {
    label?: string;
    icon?: IconDefinition,
    onClick: () => void;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, icon, disabled }) => {
    return (
        <button
            className={`bg-slate-500 text-white font-bold py-2 px-4 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-700 cursor-pointer'}}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <FontAwesomeIcon icon={icon} /> }
            {label && label}
        </button>
    )
};

export default Button;