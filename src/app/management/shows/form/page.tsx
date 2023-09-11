'use client';
import { PaginationDto } from '@/app/api/user-management/dtos/pagination-dto';
import { UserDto } from '@/app/api/user-management/dtos/user-dto';
import Input from '@/components/form/input';
import MultiSelect, { MultiSelectData } from '@/components/form/multi-select';
import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { FunctionComponent } from "react";
import { useForm } from 'react-hook-form';

type ShowFormValues = {
    name: string;
    description: string;
    moderators: Array<MultiSelectData>;
};

const ShowForm: FunctionComponent = () => {
    const {register, handleSubmit, setError, formState: { errors, isValidating } } = useForm<ShowFormValues>();

    const onSubmit = handleSubmit(async (data) => {
        await CmsApiService.PostAsync("/api/show-management",
        {
            name: data.name,
            description: data.description,
            moderatorIds: data.moderators?.map((moderator) => { return moderator.id; })
        });
    })

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='font-bold border-b'>Nová relácia</h1>
            <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                <Input
                    label='Názov relácie'
                    placeholder='Názov relácie'
                    registerReturn={register("name", { required: "Relácia musí obsahovať názov." } )}
                    error={errors?.name}
                />
                <Input
                    label='Popis relácie'
                    placeholder='Popis relácie'
                    registerReturn={register("description", { required: "Relácia musí obsahovať popis." })}
                    error={errors?.description}
                />
                <MultiSelect
                    label='Moderátori'
                    fetchData={(limit, page) => CmsApiService.GetAsync<PaginationDto<UserDto>>(`/api/user-management?limit=${limit}&page=${page}`)}
                    dataToSelectDataConverter={(data: PaginationDto<UserDto>) => data.results ? data.results?.map((user) => { return { id: user.id, value: user.nickname }}) : []}
                    registerReturn={register("moderators", { minLength: 1 })}
                    setError={setError}
                    error={errors?.moderators}
                />

                <input type="submit" value="Uložiť" className="bg-slate-500 hover:bg-slate-700 cursor-pointer text-white font-bold py-2 px-4 rounded" />
            </form>
        </div>
    );
};
  
export default withPageAuthRequired(ShowForm);