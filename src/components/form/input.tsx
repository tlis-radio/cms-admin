import { FunctionComponent } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import InputError from "./input-error";
import InputLabel from "./input-label";
import { Field } from "@headlessui/react";


type InputProps = {
    label: string;
    placeholder: string;
    registerReturn: UseFormRegisterReturn;
    error: FieldError | undefined;
}

const Input: FunctionComponent<InputProps> = ({ label, placeholder, registerReturn, error }) => {
    return (
        <Field className="flex flex-col gap-2">
            <InputLabel label={label}/>
            <input
                className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...registerReturn}
                placeholder={placeholder}
                autoComplete="off"
            />
            {error && <InputError error={error.message} />}
        </Field>
    );
};

export default Input;