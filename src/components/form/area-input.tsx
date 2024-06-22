import { FunctionComponent } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import InputError from "./input-error";
import InputLabel from "./input-label";


type InputProps = {
    label: string;
    placeholder: string;
    registerReturn?: UseFormRegisterReturn;
    error?: FieldError | undefined;
}

const  AreaInput: FunctionComponent<InputProps> = ({ label, placeholder, registerReturn, error }) => {
    return (
        <div className="flex flex-col gap-2">
            <InputLabel label={label}/>
            <textarea
                className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...registerReturn}
                placeholder={placeholder}
                autoComplete="off"
                rows={6}
            />
            {error && <InputError error={error.message} />}
        </div>
    );
};

export default AreaInput;