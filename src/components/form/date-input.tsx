import { FunctionComponent } from "react";
import InputLabel from "./input-label";
import DatePicker from "react-datepicker";
import { Field } from "@headlessui/react";

type DateInputProps = {
    label: string;
    value: Date | null;
    onChange: (event: Date) => void;
    isClearable?: boolean;
    dateFormat?: string;
}

const DateInput: FunctionComponent<DateInputProps> = ({ label, value, onChange, isClearable, dateFormat }) => {
    return (
        <Field className="flex flex-col gap-2">
            <InputLabel label={label}/>
            <DatePicker
                className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                selected={value}
                onChange={onChange}
                isClearable={isClearable}
                showTimeSelect={true}
                timeFormat="HH:mm"
                dateFormat={dateFormat ?? "dd/MM/yyyy"}
            />
        </Field>
    );
};

export default DateInput;