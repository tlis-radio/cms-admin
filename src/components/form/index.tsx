import { usePathname, useRouter } from "next/navigation";
import { UseFormHandleSubmit } from "react-hook-form";
import ServerError from "./server-error";
import { useEffect, useState } from "react";
import { getParentFolder } from "@/utils/routing";
import Button from "../button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

type FormProps = {
    title: string,
    isLoading: boolean,
    isUpdate: boolean,
    otherServerError?: unknown;
    handleSubmit: UseFormHandleSubmit<any>,
    updateFn: (data: any) => Promise<void>,
    createFn: (data: any) => Promise<void>
};

const Form: React.FC<FormProps & React.PropsWithChildren> = ({
    title,
    isLoading,
    isUpdate,
    otherServerError,
    handleSubmit,
    updateFn,
    createFn,
    children
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [ serverError, setServerError ] = useState<unknown>();

    useEffect(() => {
        setServerError(otherServerError);
    }, [otherServerError]);

    const onSubmit = handleSubmit(async (data) => {
        try
        {
            isUpdate ? await updateFn(data) : await createFn(data); 

            router.push(getParentFolder(pathname));
        }
        catch (error)
        {
            setServerError(error);
        }
    });

    if (isLoading)
    {
        return <p>Loading...</p>;
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='font-bold border-b'>{title}</h1>
            {serverError != undefined && <ServerError error={serverError} />}
            <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                {children}
                <span className="flex flex-row justify-between">
                    <Button icon={faArrowLeft} onClick={() => router.push(getParentFolder(pathname))} />
                    <input
                        type="submit"
                        value="Uložiť"
                        className="bg-emerald-500 hover:bg-emerald-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                    />
                </span>
            </form>
        </div>
    );
}

export default Form;