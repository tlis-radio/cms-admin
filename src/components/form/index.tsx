import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";
import { UseFormHandleSubmit } from "react-hook-form";

type FormProps = {
    title: string,
    isLoading: boolean,
    isUpdate: boolean,
    handleSubmit: UseFormHandleSubmit<any, undefined>,
    updateFn: (data: any) => Promise<void>,
    createFn: (data: any) => Promise<void>
};

const Form: React.FC<FormProps & React.PropsWithChildren> = ({
    title,
    isLoading,
    isUpdate,
    handleSubmit,
    updateFn,
    createFn,
    children
}) => {
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        if (isUpdate)
        {
            try
            {
                await updateFn(data);
                router.push("../");
            }
            catch
            {
                console.warn("error")
            }
        }
        else
        {
            await createFn(data);
        }
    });

    if (isLoading)
    {
        return <p>Loading...</p>;
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='font-bold border-b'>{title}</h1>
            <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                {children}
                <input type="submit" value="Uložiť" className="bg-slate-500 hover:bg-slate-700 cursor-pointer text-white font-bold py-2 px-4 rounded" />
            </form>
        </div>
    );
}

export default Form;