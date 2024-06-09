'use client';

import Input from '@/components/form/input';
import AreaInput from '@/components/form/area-input';
import MultiSelect, { MultiSelectData } from '@/components/form/multi-select';
import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import Form from '@/components/form';

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

    const { data: showData, isFetching: showIsFetching, error: showError } = useQuery(
        { queryKey: [`show-${id}`], queryFn: () => CmsApiService.Show.GetByIdAsync(id), staleTime: Infinity, enabled: id !== null, refetchOnMount: true, cacheTime: 0 });

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

    const updateFn = async (data: ShowFormValues) => {
        if (!id) return;

        return CmsApiService.Show.UpdateAsync(id, {
            name: data.name,
            description: data.description,
            moderatorIds: data.moderators?.map((moderator) => { return moderator.id; })
        });
    };

    const createFn = async (data: ShowFormValues) => {
        return CmsApiService.Show.CreateNewAsync({
            name: data.name,
            description: data.description,
            moderatorIds: data.moderators?.map((moderator) => { return moderator.id; })
        });
    };

    const deleteFn = async () => {
        if (!id) return;
  
        return CmsApiService.Show.DeleteAsync(id);
     };

    return (
        <Form
            title={id ? "Upraviť reláciu" : "Nová relácia"}
            isLoading={id !== null && showIsFetching}
            isUpdate={id !== null}
            otherServerError={showError}
            handleSubmit={handleSubmit}
            updateFn={updateFn}
            createFn={createFn}
            deleteFn={id ? deleteFn : undefined}
        >
            <Input
                label='Názov relácie'
                placeholder='Názov relácie'
                registerReturn={register("name", { required: "Relácia musí obsahovať názov." } )}
                error={errors?.name}
            />
            <AreaInput
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
        </Form>
    );
};
  
export default withPageAuthRequired(ShowForm);