import { Role } from "./role";
import { Membership } from "./membership";

export type CreateUserDto = {
    firstname: string,
    lastname: string,
    nickname: string,
    preferNicknameOverName: boolean,
    abouth: string,
    email: string | null,
    password: string,
    roleHistory: Array<CreateUserDtoRoleHistory>;
    membershipHistory: Array<CreateUserDtoMembershipHistory>;
};

export type CreateUserDtoRoleHistory = {
    functionEndDate: string | null;
    functionStartDate: string;
    roleId: string; 
    description: string | null;
};

export type CreateUserDtoMembershipHistory = {
    membershipId: string;
    description: string | null;
    changeDate: string;
};

export type UpdateUserDto = {
    firstname: string,
    lastname: string,
    nickname: string,
    abouth: string;
    preferNicknameOverName: boolean;
    roleHistory: Array<UpdateUserDtoRoleHistory>;
    membershipHistory: Array<UpdateUserDtoMembershipHistory>;
};

export type UpdateUserDtoRoleHistory = {
    id: string | null;
    functionEndDate: string | null;
    functionStartDate: string;
    roleId: string; 
    description: string | null;
};

export type UpdateUserDtoMembershipHistory = {
    id: string | null;
    membershipId: string;
    description: string | null;
    changeDate: string;
};

export type PaginationUserDto = {
    id: string;
    firstname: string;
    lastname: string;
    nickname: string;
    email: string;
    roles: Array<string>;
    status: string;
}

export type GetByIdUserDto = {
    firstname: string;
    lastname: string;
    nickname: string;
    abouth: string;
    profileImage: GetByIdUserDtoImage;
    isActive: boolean;
    preferNicknameOverName: boolean;
    externalId: string | null;
    email: string | null;
    roleHistory: Array<GetByIdUserDtoRoleHistory>;
    membershipHistory: Array<GetByIdUserDtoMembershipHistory>;
};

export type GetByIdUserDtoImage = {
    id: string;
    url: string;
};

export type GetByIdUserDtoRoleHistory = {
    id: string | null;
    functionEndDate: string | null;
    functionStartDate: string;
    role: Role; 
    description: string | null;
};

export type GetByIdUserDtoMembershipHistory = {
    id: string | null;
    membership: Membership;
    description: string | null;
    changeDate: string;
};