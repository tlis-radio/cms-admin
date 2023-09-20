'use client';

import Input from '@/components/form/input';
import MultiSelect, { MultiSelectData } from '@/components/form/multi-select';
import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from "react";
import { Controller, useForm } from 'react-hook-form';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

type ShowFormValues = {
    name: string;
    description: string;
    moderators: Array<MultiSelectData>;
};

const limit = 10;

const ShowForm: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { register, handleSubmit, setError, setValue, control, formState: { errors } } = useForm<ShowFormValues>({
        defaultValues: { name: "", description: "", moderators: [] }
    });

    const { data: showData, isFetching: showIsFetching } = useQuery({ queryKey: [`show-${id}`], queryFn: () => CmsApiService.Show.GetByIdAsync(id), staleTime: Infinity });
    const { data: usersData, isFetching: usersIsFetching, fetchNextPage: usersFetchNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: async ({ pageParam = 1 }) => CmsApiService.User.PaginationAsync(limit, pageParam),
        getNextPageParam: (lastPage) => lastPage.totalPages == lastPage.page ? undefined : lastPage.page + 1
    });

    const userOptions = useMemo<Array<MultiSelectData>>(() => {
        return usersData?.pages.map((page) =>
            page.results.map((user): MultiSelectData => { return { id: user.id, value: user.nickname ?? "" }})).flat() ?? [];
    }, [usersData]);
    

    useEffect(() => {
        if (showData) {
            setValue("name", showData.name);
            setValue("description", showData.description);
            setValue("moderators", showData.moderators.map((m) => { return { id: m.id, value: m.nickName }}));
        }
    }, [showData, setValue, userOptions]);

    const onSubmit = handleSubmit(async (data) => {
        await CmsApiService.PostAsync("/api/show-management",
        {
            name: data.name,
            description: data.description,
            moderatorIds: data.moderators?.map((moderator) => { return moderator.id; })
        });
    });

    if (id && showIsFetching)
    {
        return <p>Loading...</p>
    }

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
                <Controller
                    name="moderators"
                    control={control}
                    rules={{ minLength: 1 }}
                    render={({ field: { onChange, value } }) => (
                        <MultiSelect
                            label='Moderátori'
                            selectedOptions={value}
                            options={userOptions}
                            isLoading={usersIsFetching}
                            fetchMoreData={usersFetchNextPage}
                            registerReturn={register("moderators", { minLength: 1 })}
                            setError={setError}
                            error={errors?.moderators}
                            onChange={onChange}
                        />
                    )}
                />
                <input type="submit" value="Uložiť" className="bg-slate-500 hover:bg-slate-700 cursor-pointer text-white font-bold py-2 px-4 rounded" />
            </form>
        </div>
    );
};
  
export default withPageAuthRequired(ShowForm);