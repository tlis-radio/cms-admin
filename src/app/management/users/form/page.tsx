'use client';

import Input from '@/components/form/input';
import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import Form from '@/components/form';
import Accordeon from '@/components/accordeon';
import AccordeonSegment from '@/components/accordeon/accordeon-segment';
import Section from '@/components/form/section';
import Select, { SelectData } from '@/components/form/select';
import { DevTool } from "@hookform/devtools";
import Button from '@/components/button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type UserFormValues = {
   firstname: string;
   lastname: string;
   nickname: string;
   preferNicknameOverName: boolean;
   abouth: string;
   email: string | null;
   password: string;
   roleHistory: Array<{ role: SelectData }>;
   membershipHistory: Array<{ membership: SelectData }>;
};

const limit = 10;

const UserForm: React.FC = () => {
   const searchParams = useSearchParams();
   const id = searchParams.get('id');
   const { register, handleSubmit, setError, setValue, control, formState: { errors } } = useForm<UserFormValues>({
      defaultValues: { firstname: "", lastname: "", nickname: "", preferNicknameOverName: true, abouth: "", email: "", roleHistory: [], membershipHistory: [] }
   });
   const { fields: roleHistoryFields, append: appendRoleHistory, remove: removeRoleHistory, update: updateRoleHistory } = useFieldArray({ control, name: "roleHistory" });
   const { fields: membershipHistoryFields, append: appendMembershipHistory, remove: removeMembershipHistory, update: updateMembershipHistory } = useFieldArray({ control, name: "membershipHistory" });

   const { data: userData, isFetching: userIsFetching, error: userError } = useQuery(
      { queryKey: [`user-${id}`], queryFn: () => CmsApiService.User.GetByIdAsync(id), staleTime: Infinity, enabled: id !== null });

   const { data: rolesData, isFetching: rolesIsFetching, error: rolesError } = useQuery(
      { queryKey: ['roles'], queryFn: () => CmsApiService.User.GetRolesAsync(), staleTime: Infinity });

   const { data: membershipsData, isFetching: membershipsIsFetching, error: membershipsError } = useQuery(
      { queryKey: ['memberships'], queryFn: () => CmsApiService.User.GetMembershipsAsync(), staleTime: Infinity });

   const { data: usersData, isFetching: usersIsFetching, fetchNextPage: usersFetchNextPage } = useInfiniteQuery({
      queryKey: ['users'],
      queryFn: async ({ pageParam = 1 }) => CmsApiService.User.PaginationAsync(limit, pageParam),
      getNextPageParam: (lastPage) => lastPage.totalPages == lastPage.page ? undefined : lastPage.page + 1
   });

   const userOptions = useMemo<Array<SelectData>>(() => {
      return usersData?.pages.map((page) =>
         page.results.map((user): SelectData => { return { id: user.id, value: user.nickname ?? "" } })).flat() ?? [];
   }, [usersData]);

   const roleOptions = useMemo<Array<SelectData>>(() => {
      return rolesData?.results.map<SelectData>((role) => { return { id: role.id, value: role.name } }) ?? []
   }, [usersData]);

   const membershipOptions = useMemo<Array<SelectData>>(() => {
      return membershipsData?.results.map<SelectData>((membership) => { return { id: membership.id, value: membership.name } }) ?? []
   }, [membershipsData]);

   useEffect(() => {
      if (userData) {
         setValue("firstname", userData.firstname);
         setValue("lastname", userData.lastname);
         setValue("nickname", userData.nickname);
         setValue("preferNicknameOverName", userData.preferNicknameOverName);
         setValue("abouth", userData.abouth);
         setValue("email", userData.email);
         // TODO:
         // setValue("roleHistory", userData.roleHistory.map((m) => { return { id: m.role.id, value: m.role.name } }));
         // setValue("membershipHistory", userData.membershipHistory.map((m) => { return { id: m.membership.id, value: m.membership.status } }));
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
               id: m.role.id,
               name: m.role.value
            },
            description: ""
         })) || [],
         membershipHistory: data.membershipHistory?.map((m) => ({
            membership: {
               id: m.membership.id,
               status: m.membership.value
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
         otherServerError={userError || rolesError || membershipsError}
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
         <Section title='Role History'>
            <Button
               onClick={() => { appendRoleHistory({ role: { id: "", value: "" } })}}
               icon={faPlus}
            />
            <Accordeon>
               {roleHistoryFields.map((field, index) => (
                  <AccordeonSegment title="Datum od do" key={index}>
                     <Controller
                        name={`roleHistory.${index}.role`}
                        control={control}
                        rules={{ minLength: 1 }}
                        render={({ field: { onChange, value } }) => (
                           <Select
                              label='Role'
                              selectedOption={value}
                              options={roleOptions}
                              isLoading={rolesIsFetching}
                              error={errors?.roleHistory}
                              onChange={onChange}
                           />
                        )}
                     />
                  </AccordeonSegment>
               ))}
            </Accordeon>
         </Section>
         <Section title='Membership History'>
            <Button
               onClick={() => { appendMembershipHistory({ membership: { id: "", value: "" } })}}
               icon={faPlus}
            />
            <Accordeon>
               {membershipHistoryFields.map((field, index) => (
                  <AccordeonSegment title="Datum od do" key={index}>
                     <Controller
                        name={`membershipHistory.${index}.membership`}
                        control={control}
                        rules={{ minLength: 1 }}
                        render={({ field: { onChange, value } }) => (
                           <Select
                              label='Membership'
                              selectedOption={value}
                              options={membershipOptions}
                              isLoading={membershipsIsFetching}
                              error={errors?.membershipHistory}
                              onChange={onChange}
                           />
                        )}
                     />
                  </AccordeonSegment>
               ))}
            </Accordeon>
         </Section>
         <DevTool control={control} /> {/* set up the dev tool */}
      </Form>
   );
};

export default withPageAuthRequired(UserForm);