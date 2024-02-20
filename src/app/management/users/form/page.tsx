'use client';

import Input from '@/components/form/input';
import MultiSelect, { MultiSelectData } from '@/components/form/multi-select';
import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import Form from '@/components/form';

type UserFormValues = {
   profileImageUrl: string;
   firstname: string;
   lastname: string;
   nickname: string;
   email: string;
   abouth: string;
   isActive: boolean;
   roleHistory: Array<MultiSelectData>;
};

const limit = 10;

const UserForm: React.FC = () => {
   const searchParams = useSearchParams();
   const id = searchParams.get('id');
   const { register, handleSubmit, setError, setValue, control, formState: { errors } } = useForm<UserFormValues>({
      defaultValues: { profileImageUrl: "",firstname: "", lastname: "", nickname: "", email: "", abouth: "", isActive: true, roleHistory: [] }
   });

   const { data: userData, isFetching: userIsFetching, error: userError } = useQuery(
      { queryKey: [`user-${id}`], queryFn: () => CmsApiService.User.GetByIdAsync(id), staleTime: Infinity, enabled: id !== null });

   const { data: usersData, isFetching: usersIsFetching, fetchNextPage: usersFetchNextPage } = useInfiniteQuery({
      queryKey: ['users'],
      queryFn: async ({ pageParam = 1 }) => CmsApiService.User.PaginationAsync(limit, pageParam),
      getNextPageParam: (lastPage) => lastPage.totalPages == lastPage.page ? undefined : lastPage.page + 1
   });

   const userOptions = useMemo<Array<MultiSelectData>>(() => {
      return usersData?.pages.map((page) =>
         page.results.map((user): MultiSelectData => { return { id: user.id, value: user.nickname ?? "" } })).flat() ?? [];
   }, [usersData]);

   useEffect(() => {
      if (userData) {
         setValue("profileImageUrl", userData.profileImageUrl);
         setValue("firstname", userData.firstname);
         setValue("lastname", userData.lastname);
         setValue("nickname", userData.nickname);
         setValue("email", userData.email);
         setValue("abouth", userData.abouth);
         setValue("isActive", userData.isActive);
         setValue("roleHistory", userData.roleHistory.map((m) => { return { id: m.id, value: m.name } }));
      }
   }, [userData, setValue, userOptions]);

   const updateFn = async (data: UserFormValues) => {
      if (!id) return;

      return CmsApiService.User.UpdateAsync(id, {
         firstname: data.firstname,
         abouth: data.abouth,
         roleIds: data.roleHistory?.map((role) => { return role.id; })
      });
   };

   const createFn = async (data: UserFormValues) => {
      return CmsApiService.User.CreateNewAsync({
         firstname: data.firstname,
         abouth: data.abouth,
         roleIds: data.roleHistory?.map((role) => { return role.id; })
      });
   };

   return (
      <Form
         title={id ? "Upraviť uživatela" : "Nový uživatel"}
         isLoading={id !== null && userIsFetching}
         isUpdate={id !== null}
         otherServerError={userError}
         handleSubmit={handleSubmit}
         updateFn={updateFn}
         createFn={createFn}
      >
         <Input
            label='Fotka uživatela'
            placeholder='Fotka uživatela'
            registerReturn={register("profileImageUrl", { required: "Uživatel musí obsahovať fotku." })}
            error={errors?.profileImageUrl}
         />
         <Input
            label='Meno uživatela'
            placeholder='Meno uživatela'
            registerReturn={register("firstname", { required: "Uživatel musí obsahovať meno." })}
            error={errors?.firstname}
         />
         <Input
            label='Priezvisko uživatela'
            placeholder='Priezvisko uživatela'
            registerReturn={register("lastname", { required: "Uživatel musí obsahovať priezvisko." })}
            error={errors?.lastname}
         />
         <Input
            label='Prezívka uživatela'
            placeholder='Prezívka uživatela'
            registerReturn={register("nickname", { required: "Uživatel musí obsahovať prezívkú." })}
            error={errors?.nickname}
         />
         <Input
            label='Email uživatela'
            placeholder='Email uživatela'
            registerReturn={register("email", { required: "Uživatel musí obsahovať email." })}
            error={errors?.email}
         />
         <Input
            label='Popis uživatela'
            placeholder='Popis uživatela'
            registerReturn={register("abouth", { required: "Uživatel musí obsahovať popis." })}
            error={errors?.abouth}
         />
         <Controller
            name="roleHistory"
            control={control}
            rules={{ minLength: 1 }}
            render={({ field: { onChange, value } }) => (
               <MultiSelect
                  label='Role'
                  selectedOptions={value}
                  options={userOptions}
                  isLoading={usersIsFetching}
                  fetchMoreData={usersFetchNextPage}
                  registerReturn={register("roleHistory", { minLength: 1 })}
                  setError={setError}
                  error={errors?.roleHistory}
                  onChange={onChange}
               />
            )}
         />
      </Form>
   );
};

export default withPageAuthRequired(UserForm);