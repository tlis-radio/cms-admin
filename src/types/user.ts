export type CreateUserDto = {
    firstname: string,
    lastname: string,
    nickname: string,
    preferNicknameOverName: boolean,
    abouth: string,
    email: string | null,
    password: string,
    roleHistory: Array<UserRoleHistoryDto>;
    membershipHistory: Array<UserMembershipHistoryDto>;
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
    isActive: boolean;
    roleHistory: Array<UserRoleHistoryDto>;
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
    role: { 
        id: string;
        name: string; 
    }
    description: string | null;
};

export type UserMembershipHistoryDto = {
    membership: MembershipDto;
    description: string | null;
    changeDate: string;
};

export type MembershipDto = {
    id: string;
    status: string;
};