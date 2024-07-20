import { Fragment, FunctionComponent, useCallback } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import InputLabel from "./input-label";
import InputError from "./input-error";
import { Field, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { faGear, faArrowsUpDown, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FetchNextPageOptions } from '@tanstack/react-query';

export type MultiSelectData = {
    id: string;
    value: string;
}

type MultiSelectProps = {
    label: string;
    error: Merge<FieldError, FieldErrorsImpl<MultiSelectData>> | undefined;
    selectedOptions: Array<MultiSelectData>;
    options: Array<MultiSelectData>;
    isLoading: boolean;
    fetchMoreData?: (options?: FetchNextPageOptions | undefined) => Promise<any>;
    onChange: (...event: any[]) => void;
}

const MultiSelect: FunctionComponent<MultiSelectProps> = ({
    label,
    error,
    isLoading,
    fetchMoreData,
    selectedOptions,
    options,
    onChange
}): JSX.Element => {
    const memorizedOnScroll = useCallback(async (target: HTMLElement) => {
        if (fetchMoreData && Math.floor(target.scrollHeight - target.scrollTop) == target.clientHeight)
        {
            await fetchMoreData();
        }
    }, [fetchMoreData]);

    const getValues = (): MultiSelectData[] => {
        return options.filter((option) => selectedOptions?.find(v => v.id == option.id));
    };

    return (
        <Field className="flex flex-col gap-2 w-72">
            <InputLabel label={label}/>
            <Listbox
                value={getValues()}
                onChange={onChange}
                multiple
            >
                <div className="relative mt-1">
                    <ListboxButton className="flex flex-row w-full bg-white items-center rounded shadow border py-2 px-2 focus:outline-none focus:shadow-outline appearance-none">
                        <span className="relative w-full flex flex-wrap items-center text-left gap-2">
                            {selectedOptions.map(x => (
                                <span key={x.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{x.value}</span>
                            ))}
                        </span>
                        <FontAwesomeIcon className="text-gray-400" icon={faArrowsUpDown} />
                    </ListboxButton>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <ListboxOptions
                            onScroll={(e) => memorizedOnScroll(e.target as HTMLElement)}
                            className="absolute mt-1 max-h-60 w-full overflow-auto bg-white shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                        >
                            {options.map((option) => (
                                <ListboxOption
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
                                </ListboxOption>
                            ))}
                            {isLoading && <span className='flex items-center justify-center p-4'><FontAwesomeIcon icon={faGear} size='2xl' spin/></span>}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
            {error && <InputError error={error?.message}/>}
        </Field>
    );
};

export default MultiSelect;