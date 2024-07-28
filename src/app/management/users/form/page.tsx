'use client';

import Input from '@/components/form/input';
import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from "react";
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Form from '@/components/form';
import Accordeon from '@/components/accordeon';
import AccordeonSegment from '@/components/accordeon/accordeon-segment';
import Section from '@/components/form/section';
import Select, { SelectData } from '@/components/form/select';
import Button from '@/components/button';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DateInput from '@/components/form/date-input';
import ImageInput from '@/components/form/image-input';
import AreaInput from '@/components/form/area-input';
import { DevTool } from "@hookform/devtools";
import CheckboxInput from '@/components/form/checkbox-input';

type UserFormValues = {
   firstname: string;
   lastname: string;
   nickname: string;
   preferNicknameOverName: boolean;
   cmsAdminAccess: boolean;
   abouth: string;
   email: string | null;
   password: string;
   image: FileList | string | null;
   roleHistory: Array<{ historyId: string | null, role: SelectData, functionStartDate: Date, functionEndDate: Date | null, description: string | null }>;
   membershipHistory: Array<{ historyId: string | null, membership: SelectData, changeDate: Date, description: string | null }>;
};

const UserForm: React.FC = () => {
   const searchParams = useSearchParams();
   const id = searchParams.get('id');
   const { register, handleSubmit, setError, setValue, control, formState: { errors } } = useForm<UserFormValues>({
      defaultValues: { firstname: "", lastname: "", nickname: "", image: null, preferNicknameOverName: true, abouth: "", email: "", roleHistory: [], membershipHistory: [] }
   });
   const imageWatch = useWatch({ control, name: "image" });
   const preferNicknameOverNameWatch = useWatch({ control, name: "preferNicknameOverName" });
   const cmsAdminAccessWatch = useWatch({ control, name: "cmsAdminAccess" });

   const { fields: roleHistoryFields, append: appendRoleHistory, remove: removeRoleHistory, update: updateRoleHistory } = useFieldArray({ control, name: "roleHistory" });
   const { fields: membershipHistoryFields, append: appendMembershipHistory, remove: removeMembershipHistory, update: updateMembershipHistory } = useFieldArray({ control, name: "membershipHistory" });

   const { data: userData, isFetching: userIsFetching, isFetched: userIsFetched, error: userError } = useQuery(
      { queryKey: [`user-${id}`], queryFn: () => CmsApiService.User.GetByIdAsync(id), enabled: id !== null, refetchOnMount: true, staleTime: 0, gcTime: 1 });

   const { data: rolesData, isFetching: rolesIsFetching, error: rolesError } = useQuery(
      { queryKey: ['roles'], queryFn: () => CmsApiService.User.GetRolesAsync(), staleTime: Infinity });

   const { data: membershipsData, isFetching: membershipsIsFetching, error: membershipsError } = useQuery(
      { queryKey: ['memberships'], queryFn: () => CmsApiService.User.GetMembershipsAsync(), staleTime: Infinity });

   const roleOptions = useMemo<Array<SelectData>>(() => {
      return rolesData?.results.map<SelectData>((role) => { return { id: role.id, value: role.name } }) ?? []
   }, [rolesData]);

   const membershipOptions = useMemo<Array<SelectData>>(() => {
      return membershipsData?.results.map<SelectData>((membership) => { return { id: membership.id, value: membership.status } }) ?? []
   }, [membershipsData]);

   useEffect(() => {
      if (userData) {
         setValue("firstname", userData.firstname);
         setValue("lastname", userData.lastname);
         setValue("nickname", userData.nickname);
         setValue("preferNicknameOverName", userData.preferNicknameOverName);
         setValue("cmsAdminAccess", userData.cmsAdminAccess);
         setValue("abouth", userData.abouth);
         setValue("email", userData.email);
         if (userData.profileImage)
         {
            setValue("image", userData.profileImage.url, { shouldValidate: true });
         }
         setValue("roleHistory", userData.roleHistory.map((m) => {
            return { 
               historyId: m.id,
               functionStartDate: m.functionStartDate,
               functionEndDate: m.functionEndDate,
               description: m.description,
               role: { id: m.role.id, value: m.role.name }
            }
         }));
         setValue("membershipHistory", userData.membershipHistory.map((m) => {
            return {
               historyId: m.id,
               changeDate: m.changeDate,
               description: m.description,
               membership: { id: m.membership.id, value: m.membership.status }
            }
         }));
      }
   }, [userIsFetched]);

   const updateFn = async (data: UserFormValues) => {
      if (!id || !userData) return;

      if (imageWatch && typeof imageWatch !== "string")
      {
         await CmsApiService.Image.UploadUserProfileImageAsync(imageWatch[0], id);
      }

      await CmsApiService.User.UpdateAsync(id, {
         firstname: data.firstname,
         lastname: data.lastname,
         nickname: data.nickname,
         abouth: data.abouth,
         email: data.email,
         preferNicknameOverName: data.preferNicknameOverName,
         cmsAdminAccess: data.cmsAdminAccess,
         membershipHistory: data.membershipHistory.map((m) => ({
            id: m.historyId,
            membershipId: m.membership.id,
            description: m.description,
            changeDate: m.changeDate.toISOString(),
         })),
         roleHistory: data.roleHistory.map((m) => ({
            id: m.historyId,
            roleId: m.role.id,
            description: m.description,
            functionEndDate: m.functionEndDate?.toISOString() ?? null,
            functionStartDate: m.functionStartDate.toISOString(),
         }))
      });

      if (imageWatch && typeof imageWatch !== "string")
      {
         var response = await CmsApiService.Image.UploadUserProfileImageAsync(imageWatch[0], id);

         await CmsApiService.User.UpdateProfileImageAsync(id, { profileImageId: response.id });
      }
   };

   const createFn = async (data: UserFormValues): Promise<void> => {
      if (!imageWatch || typeof imageWatch == "string")
      {
         return;
      }

      const response = await CmsApiService.User.CreateNewActiveAsync({
         firstname: data.firstname,
         lastname: data.lastname,
         nickname: data.nickname,
         email: data.email,
         password: data.password,
         preferNicknameOverName: data.preferNicknameOverName,
         cmsAdminAccess: data.cmsAdminAccess,
         abouth: data.abouth,
         roleHistory: data.roleHistory.map((m) => ({
            functionEndDate: m.functionEndDate?.toISOString() ?? null,
            functionStartDate: m.functionStartDate.toISOString(),
            roleId: m.role.id,
            description: m.description
         })),
         membershipHistory: data.membershipHistory.map((m) => ({
            membershipId: m.membership.id,
            description: m.description,
            changeDate: m.changeDate.toISOString()
         }))
      });

      var imageResponse = await CmsApiService.Image.UploadUserProfileImageAsync(imageWatch[0], response.id);

      await CmsApiService.User.UpdateProfileImageAsync(response.id, { profileImageId: imageResponse.id });
   };

   const deleteFn = async () => {
      if (!id) return;

      return CmsApiService.User.DeleteAsync(id);
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
         deleteFn={id ? deleteFn : undefined}
      >
         <Input
            label='Prezývka uživatela'
            placeholder='Prezývka uživatela'
            registerReturn={register("nickname", { required: "Uživatel musí obsahovať prezívku." })}
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
         <CheckboxInput
            label='Umožniť prístup do admina'
            registerReturn={register("cmsAdminAccess")}
            checked={cmsAdminAccessWatch}
            onChange={(checked) => setValue("cmsAdminAccess", checked)}
            error={errors?.cmsAdminAccess}
         />
         <CheckboxInput
            label='Preferovať prezývku pred menom'
            registerReturn={register("preferNicknameOverName")}
            checked={preferNicknameOverNameWatch}
            onChange={(checked) => setValue("preferNicknameOverName", checked)}
            error={errors?.preferNicknameOverName}
         />
         <AreaInput
            label='Popis uživatela'
            placeholder='Popis uživatela'
            registerReturn={register("abouth", { required: "Uživatel musí obsahovať popis." })}
            error={errors?.abouth}
         />
         <div className='flex flex-row justify-center'>
            <ImageInput
               registerReturn={register("image", { validate: (x) => x === null ? "Uživatel musí obsahovať obrázok" : true })}
               watch={imageWatch}
               error={errors?.image}
            />
         </div>
         <Section
            title='Role History'
            onAdd={() => { appendRoleHistory({ historyId: null, role: { id: roleOptions[0].id, value: roleOptions[0].value }, functionStartDate: new Date(), functionEndDate: null, description: null }) }}
         >
            <Accordeon>
               {roleHistoryFields.map((field, index) => (
                  <AccordeonSegment title={field.role.value} key={index}>
                     <DateInput
                        label='Function Start Date'
                        value={field.functionStartDate}
                        onChange={(ev) => { updateRoleHistory(index, { ...field, functionStartDate: ev as Date })}}
                     />
                     <DateInput
                        label='Function End Date'
                        value={field.functionEndDate}
                        onChange={(ev) => updateRoleHistory(index, { ...field, functionEndDate: ev })}
                        isClearable={true}
                     />
                     <Select
                        label='Role'
                        selectedOption={field.role}
                        options={roleOptions}
                        isLoading={rolesIsFetching}
                        onChange={(ev) => updateRoleHistory(index, { ...field, role: ev })}
                     />
                     <AreaInput
                        label='Popis'
                        placeholder='Popis'
                        registerReturn={register(`roleHistory.${index}.description`)}
                     />
                     <span className='flex flex-row justify-end py-4'>
                        <Button
                           onClick={() => removeRoleHistory(index)}
                           icon={faTrash}
                           type='DELETE'
                        />
                     </span>
                  </AccordeonSegment>
               ))}
            </Accordeon>
         </Section>
         <Section
            title='Membership History'
            onAdd={() => { appendMembershipHistory({ historyId: null, membership: { id: membershipOptions[0].id, value: membershipOptions[0].value }, changeDate: new Date(), description: null})}}
         >
            <Accordeon>
               {membershipHistoryFields.map((field, index) => (
                  <AccordeonSegment title={field.membership.value} key={index}>
                     <Select
                        label='Membership'
                        selectedOption={field.membership}
                        options={membershipOptions}
                        isLoading={membershipsIsFetching}
                        onChange={(ev) => updateMembershipHistory(index, { ...field, membership: ev })}
                     />
                     <DateInput
                        label='Change Date'
                        value={field.changeDate}
                        onChange={(ev) => updateMembershipHistory(index, { ...field, changeDate: ev as Date })}
                     />
                     <AreaInput
                        label='Popis'
                        placeholder='Popis'
                        registerReturn={register(`membershipHistory.${index}.description`)}
                     />
                     <span className='flex flex-row justify-end py-4'>
                        <Button
                           onClick={() => removeMembershipHistory(index)}
                           icon={faTrash}
                           type='DELETE'
                        />
                     </span>
                  </AccordeonSegment>
               ))}
            </Accordeon>
         </Section>
         <DevTool control={control} />
      </Form>
   );
};

export default withPageAuthRequired(UserForm);