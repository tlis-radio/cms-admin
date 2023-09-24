import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonProps = {
    type?: "ADD"
    label?: string;
    icon?: IconDefinition,
    onClick: () => void;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ type, label, onClick, icon, disabled }) => {
    let color = "slate";
    
    switch (type) {
        case "ADD":
            color = "emerald";
            break;
    };
    
    return (
        <button
            className={`bg-${color}-500 text-white font-bold py-2 px-4 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : `hover:bg-${color}-700 cursor-pointer`}}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <FontAwesomeIcon icon={icon} /> }
            {label && label}
        </button>
    )
};

export default Button;