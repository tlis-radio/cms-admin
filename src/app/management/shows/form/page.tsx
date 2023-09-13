'use client';
import { PaginationDto } from '@/app/api/user-management/dtos/pagination-dto';
import { UserDto } from '@/app/api/user-management/dtos/user-dto';
import Input from '@/components/form/input';
import MultiSelect, { MultiSelectData } from '@/components/form/multi-select';
import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useSearchParams } from 'next/navigation';
import { FunctionComponent, useEffect, useMemo } from "react";
import { useForm } from 'react-hook-form';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { ShowDto } from '@/app/api/show-management/dtos/show-dto';

type ShowFormValues = {
    name: string;
    description: string;
    moderators: Array<MultiSelectData>;
};

const limit = 10;

const ShowForm: FunctionComponent = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { data: showData } = useQuery({
        queryKey: ['show', id],
        queryFn: async () => CmsApiService.GetAsync<ShowDto>(`/api/show-management/${id}`),
        staleTime: Infinity
    });

    const {
        data: usersData,
        isFetching: usersIsFetching,
        fetchNextPage: usersFetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: async ({ pageParam = 1 }) => CmsApiService.GetAsync<PaginationDto<UserDto>>(`/api/user-management?limit=${limit}&page=${pageParam}`),
        getNextPageParam: (lastPage) => lastPage.totalPages == lastPage.page ? undefined : lastPage.page + 1
    });

    const userOptions = useMemo<Array<MultiSelectData>>(() => {
        return usersData?.pages.map((page) => page.results.map((user): MultiSelectData => { return { id: user.id, value: user.nickname }})).flat() ?? [];
    }, [usersData]);

    const {
        register, handleSubmit, watch, setError, setValue, formState: { errors }
    } = useForm<ShowFormValues>({ defaultValues: { name: "", description: "", moderators: [] }});

    const onSubmit = handleSubmit(async (data) => {
        await CmsApiService.PostAsync("/api/show-management",
        {
            name: data.name,
            description: data.description,
            moderatorIds: data.moderators?.map((moderator) => { return moderator.id; })
        });
    })

    useEffect(() => {
        if (showData) {
            setValue("name", showData.name);
            setValue("description", showData.description);
            setValue("moderators", []);
        }
    }, [showData, setValue]);

    console.log(usersIsFetching)


    return (
        <div className='flex flex-col gap-4'>
            <h1 onClick={() => usersFetchNextPage()} className='font-bold border-b'>Nová relácia</h1>
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
                    selectedOptions={watch("moderators")}
                    options={userOptions}
                    isLoading={usersIsFetching}
                    fetchMoreData={usersFetchNextPage}
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