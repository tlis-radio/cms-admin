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
   firstname: string;
   lastname: string;
   nickname: string;
   preferNicknameOverName: boolean;
   abouth: string;
   email: string | null;
   password: string;
   roleHistory: Array<MultiSelectData>;
   membershipHistory: Array<MultiSelectData>;
};

const limit = 10;

const UserForm: React.FC = () => {
   const searchParams = useSearchParams();
   const id = searchParams.get('id');
   const { register, handleSubmit, setError, setValue, control, formState: { errors } } = useForm<UserFormValues>({
      defaultValues: { firstname: "", lastname: "", nickname: "", preferNicknameOverName: true, abouth: "", email: "", roleHistory: [], membershipHistory: [] }
   });

   const { data: userData, isFetching: userIsFetching, error: userError } = useQuery(
      { queryKey: [`user-${id}`], queryFn: () => CmsApiService.User.GetByIdAsync(id), staleTime: Infinity, enabled: id !== null });

   const { data: rolesData, isFetching: rolesIsFetching, error: rolesError } = useQuery(
      { queryKey: ['roles'], queryFn: () => CmsApiService.User.GetRolesAsync(), staleTime: Infinity });

   const { data: usersData, isFetching: usersIsFetching, fetchNextPage: usersFetchNextPage } = useInfiniteQuery({
      queryKey: ['users'],
      queryFn: async ({ pageParam = 1 }) => CmsApiService.User.PaginationAsync(limit, pageParam),
      getNextPageParam: (lastPage) => lastPage.totalPages == lastPage.page ? undefined : lastPage.page + 1
   });

   const userOptions = useMemo<Array<MultiSelectData>>(() => {
      return usersData?.pages.map((page) =>
         page.results.map((user): MultiSelectData => { return { id: user.id, value: user.nickname ?? "" } })).flat() ?? [];
   }, [usersData]);

   const roleOptions = useMemo<Array<MultiSelectData>>(() => {
      return rolesData?.results.map<MultiSelectData>((role) => { return { id: role.id, value: role.name } }) ?? []
   }, [usersData]);

   useEffect(() => {
      if (userData) {
         setValue("firstname", userData.firstname);
         setValue("lastname", userData.lastname);
         setValue("nickname", userData.nickname);
         setValue("preferNicknameOverName", userData.preferNicknameOverName);
         setValue("abouth", userData.abouth);
         setValue("email", userData.email);
         setValue("roleHistory", userData.roleHistory.map((m) => { return { id: m.role.id, value: m.role.name } }));
         setValue("membershipHistory", userData.membershipHistory.map((m) => { return { id: m.membership.id, value: m.membership.status } }));
      }
   }, [userData, setValue, userOptions]);

   const updateFn = async (data: UserFormValues) => {
      if (!id) return;

      return CmsApiService.User.UpdateAsync(id, {
         firstname: data.firstname,
         lastname: data.lastname,
         nickname: data.nickname,
         abouth: data.abouth
      });
   };

   const createFn = async (data: UserFormValues) => {
      return CmsApiService.User.CreateNewActiveAsync({
         firstname: data.firstname,
         lastname: data.lastname,
         nickname: data.nickname,
         email: data.email,
         password: data.password,
         preferNicknameOverName: data.preferNicknameOverName,
         abouth: data.abouth,
         roleHistory: data.roleHistory?.map((m) => ({
            functionEndDate: null,
            functionStartDate: "",
            role: {
               id: m.id,
               name: m.value
            },
            description: ""
         })) || [],
         membershipHistory: data.membershipHistory?.map((m) => ({
            membership: {
               id: m.id,
               status: m.value
            },
            description: "",
            changeDate: ""
         }))
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
            label='Prezývka uživatela'
            placeholder='Prezývka uživatela'
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
                  options={roleOptions}
                  isLoading={rolesIsFetching}
                  registerReturn={register("roleHistory", { minLength: 1 })}
                  setError={setError}
                  error={errors?.roleHistory}
                  onChange={onChange}
               />
            )}
         />
         <Controller
            name="membershipHistory"
            control={control}
            rules={{ minLength: 1 }}
            render={({ field: { onChange, value } }) => (
               <MultiSelect
                  label='Membership'
                  selectedOptions={value}
                  options={userOptions}
                  isLoading={usersIsFetching}
                  fetchMoreData={usersFetchNextPage}
                  registerReturn={register("membershipHistory", { minLength: 1 })}
                  setError={setError}
                  error={errors?.membershipHistory}
                  onChange={onChange}
               />
            )}
         />
      </Form>
   );
};

export default withPageAuthRequired(UserForm);