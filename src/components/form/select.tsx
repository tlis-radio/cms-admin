import { Fragment, FunctionComponent, useCallback } from "react";
import { ErrorOption, FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn, UseFormSetError } from "react-hook-form";
import InputLabel from "./input-label";
import InputError from "./input-error";
import { Listbox, Transition } from "@headlessui/react";
import { faGear, faArrowsUpDown, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FetchNextPageOptions } from '@tanstack/react-query';

export type SelectData = {
    id: string;
    value: string;
}

type SelectProps = {
    label: string;
    error?: Merge<FieldError, FieldErrorsImpl<SelectData>> | undefined;
    selectedOption: SelectData;
    options: Array<SelectData>;
    isLoading: boolean;
    fetchMoreData?: (options?: FetchNextPageOptions | undefined) => Promise<any>;
    onChange: (event: SelectData) => void;
    disabled?: boolean;
}

const Select: FunctionComponent<SelectProps> = ({
    label,
    error,
    isLoading,
    fetchMoreData,
    selectedOption,
    options,
    disabled,
    onChange
}): JSX.Element => {
    const memorizedOnScroll = useCallback(async (target: HTMLElement) => {
        if (fetchMoreData && Math.floor(target.scrollHeight - target.scrollTop) == target.clientHeight)
        {
            await fetchMoreData();
        }
    }, [fetchMoreData]);

    return (
        <div className="flex flex-col gap-2 w-72">
            <InputLabel label={label}/>
            <Listbox
                value={selectedOption}
                onChange={onChange}
                disabled={disabled}
            >
                <div className="relative mt-1">
                    <Listbox.Button className="flex flex-row w-full bg-white items-center rounded shadow border py-2 px-2 focus:outline-none focus:shadow-outline appearance-none disabled:bg-slate-300">
                        <span className="relative w-full flex flex-wrap items-center text-left gap-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{selectedOption.value}</span>
                        </span>
                        <FontAwesomeIcon className="text-gray-400" icon={faArrowsUpDown} />
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            onScroll={(e) => memorizedOnScroll(e.target as HTMLElement)}
                            className="absolute mt-1 max-h-60 w-full overflow-auto bg-white shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm z-50"
                        >
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-slate-100' : 'text-gray-900'}`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`} >
                                                {option.value}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-600">
                                                    <FontAwesomeIcon icon={faSquareCheck}/>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                            {isLoading && <span className='flex items-center justify-center p-4'><FontAwesomeIcon icon={faGear} size='2xl' spin/></span>}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
            {error && <InputError error={error?.message}/>}
        </div>
    );
};

export default Select;