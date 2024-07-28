import { FunctionComponent } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import InputError from "./input-error";
import InputLabel from "./input-label";
import { Field } from "@headlessui/react";
import { Checkbox } from '@headlessui/react'

type CheckboxProps = {
    label: string;
    registerReturn: UseFormRegisterReturn;
    onChange: (checked: boolean) => void;
    checked: boolean;
    error: FieldError | undefined;
}

const CheckboxInput: FunctionComponent<CheckboxProps> = ({ label, checked, onChange, error }) => {
    return (
        <Field className="flex flex-col gap-2">
            <InputLabel label={label}/>
            <Checkbox
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                checked={checked}
                onChange={onChange}
            >
                <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Checkbox>
            {error && <InputError error={error.message} />}
        </Field>
    );
};

export default CheckboxInput;