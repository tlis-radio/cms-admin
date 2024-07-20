import { FunctionComponent } from "react";
import { Label } from "@headlessui/react";

type InputLabelProps = {
    label: string;
}

const InputLabel: FunctionComponent<InputLabelProps> = ({label}) => {
    return (
        <Label className="text-gray-700 text-sm font-bold">
            {label}
        </Label>
    );
};

export default InputLabel;