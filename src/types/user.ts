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
    profileImageId: string;
    isActive: boolean;
    preferNicknameOverName: boolean;
    externalId: string | null;
    email: string | null;
    roleHistory: Array<GetByIdUserDtoRoleHistory>;
    membershipHistory: Array<UserMembershipHistoryDtoMembershipHistory>;
};

export type GetByIdUserDtoRoleHistory = {
    functionEndDate: string | null;
    functionStartDate: string;
    role: Role; 
    description: string | null;
};

export type UserMembershipHistoryDtoMembershipHistory = {
    membership: Membership;
    description: string | null;
    changeDate: string;
};