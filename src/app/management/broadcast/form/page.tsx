'use client';

import Input from '@/components/form/input';
import AreaInput from '@/components/form/area-input';
import Select, { SelectData } from '@/components/form/select';
import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import Form from '@/components/form';
import DateInput from '@/components/form/date-input';
import ImageInput from '@/components/form/image-input';

type BroadcastFormValues = {
    name: string;
    description: string;
    show: SelectData | null;
    startDate: Date;
    endDate: Date;
    image: FileList | string | null;
};

const limit = 10;

const BroadcastForm: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { register, handleSubmit, setError, setValue, control, formState: { errors } } = useForm<BroadcastFormValues>({
        defaultValues: { name: "", description: "", show: null, startDate: new Date(), endDate: new Date(), image: null }
    });
    const imageWatch = useWatch({ control, name: "image" });

    const { data: broadcastData, isFetching: broadcastIsFetching, error: showError } = useQuery(
        { queryKey: [`broadcast-${id}`], queryFn: () => CmsApiService.Broadcast.GetByIdAsync(id), staleTime: 0, enabled: id !== null, refetchOnMount: true, gcTime: 1 });

    const { data: showsData, isFetching: showsIsFetching, fetchNextPage: showsFetchNextPage } = useInfiniteQuery({
        queryKey: ['shows'],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => CmsApiService.Show.PaginationAsync(limit, pageParam),
        getNextPageParam: (lastPage) => lastPage.totalPages == lastPage.page ? undefined : lastPage.page + 1
    });

    const showOptions = useMemo<Array<SelectData>>(() => {
        return showsData?.pages.map((page) =>
            page.results.map((show): SelectData => { return { id: show.id, value: show.name ?? "" }})).flat() ?? [];
    }, [showsData]);
    
    useEffect(() => {
        if (broadcastData) {
            setValue("name", broadcastData.name);
            setValue("description", broadcastData.description);
            setValue("startDate", broadcastData.startDate);
            setValue("endDate", broadcastData.endDate);
            setValue("show", { id: broadcastData.show.id, value: broadcastData.show.name });
            if (broadcastData.image)
            {
                setValue("image", broadcastData.image.url);
            }
        }
    }, [broadcastData, setValue, showOptions]);

    const updateFn = async (data: BroadcastFormValues) => {
        if (!id || !data.show) return;

        await CmsApiService.Broadcast.UpdateAsync(id, {
            name: data.name,
            description: data.description,
            showId: data.show.id,
            startDate: data.startDate,
            endDate: data.endDate,
        });

        if (imageWatch && typeof imageWatch !== "string")
        {
            var response = await CmsApiService.Image.UploadBroadcastImageAsync(imageWatch[0], id);

            await CmsApiService.Broadcast.UpdateImageAsync(id, { imageId: response.id });
        }
    };

    const createFn = async (data: BroadcastFormValues) => {
        if (!imageWatch || typeof imageWatch == "string")
        {
            throw new Error("Image is required");
        }

        if (!data.show)
        {
            return;
        }

        var response = await CmsApiService.Broadcast.CreateNewAsync({
            name: data.name,
            description: data.description,
            showId: data.show.id,
            startDate: data.startDate,
            endDate: data.endDate
        });

        var imageResponse = await CmsApiService.Image.UploadBroadcastImageAsync(imageWatch[0], response.id);

        await CmsApiService.Broadcast.UpdateImageAsync(response.id, { imageId: imageResponse.id });
    };

    return (
        <Form
            title={id ? "Upraviť vysielanie" : "Nové vysielanie"}
            isLoading={id !== null && broadcastIsFetching}
            isUpdate={id !== null}
            otherServerError={showError}
            handleSubmit={handleSubmit}
            updateFn={updateFn}
            createFn={createFn}
        >
            <Input
                label='Názov vysielania'
                placeholder='Názov vysielania'
                registerReturn={register("name", { required: "Vysielanie musí obsahovať názov." } )}
                error={errors?.name}
            />
            <div className='flex flex-row justify-center'>
                <ImageInput
                    registerReturn={register("image", { validate: (x) => x === null ? "Vysielanie musí obsahovať obrázok" : true })}
                    watch={imageWatch}
                    error={errors?.image}
                />
            </div>
            <Controller
                name="startDate"
                control={control}
                rules={{ required: "Vysielanie musí obsahovať začiatok vysielania." }}
                render={({ field: { onChange, value } }) => (
                    <DateInput
                        label='Začiatok vysielania'
                        value={value}
                        onChange={onChange}
                        dateFormat='dd/MM/yyyy HH:mm'
                    />
                )}
            />
            <Controller
                name="endDate"
                control={control}
                rules={{ required: "Vysielanie musí obsahovať koniec vysielania." }}
                render={({ field: { onChange, value } }) => (
                    <DateInput
                        label='Koniec vysielania'
                        value={value}
                        onChange={onChange}
                        dateFormat='dd/MM/yyyy HH:mm'
                    />
                )}
            />
            <Controller
                name="show"
                control={control}
                rules={{ required: "Vysielanie musí obsahovať referenciu na reláciu." }}
                render={({ field: { onChange, value } }) => (
                    <Select
                        label='Relácia'
                        selectedOption={value}
                        options={showOptions}
                        isLoading={showsIsFetching}
                        fetchMoreData={showsFetchNextPage}
                        error={errors?.show}
                        onChange={onChange}
                    />
                )}
            />
            <AreaInput
                label='Popis vysielania'
                placeholder='Popis vysielania'
                registerReturn={register("description", { required: "Vysielanie musí obsahovať popis." })}
                error={errors?.description}
            />
        </Form>
    );
};
  
export default withPageAuthRequired(BroadcastForm);