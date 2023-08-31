import { FunctionComponent } from "react";

type InputLabelProps = {
    label: string;
}

const InputLabel: FunctionComponent<InputLabelProps> = ({label}) => {
    return (
        <label className="text-gray-700 text-sm font-bold">
            {label}
        </label>
    );
};

export default InputLabel;