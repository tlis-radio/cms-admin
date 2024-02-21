import { MembershipDto } from "./membership";

export type CreateActiveUserDto = {
    firstname: string,
    lastname: string,
    nickname: string,
    email: string,
    password: string,
    preferNicknameOverName: boolean,
    abouth: string,
    memberSinceDate: string,
    functionStartDate: string;
    roleId: string,
};

export type CreateArchiveUserDto = {
    //TODO:
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
    isActive: boolean;
    email: string;
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
    roleHistory: Array<UserRoleHistoryDto>;
    membershipHistory: Array<UserMembershipHistoryDto>;
};

export type UserRoleHistoryDto = {
    functionEndDate: string | null;
    functionStartDate: string;
    role: { name: string; }
    description: string | null;
};

export type UserMembershipHistoryDto = {
    description: string | null;
    changeDate: string;
    membership: MembershipDto;
};