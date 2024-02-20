export type CreateUserDto = {
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

export type UpdateUserDto = {
    firstname: string,
    lastname: string,
    nickname: string,
    abouth: string;
};

export type UserDto = {
    id: string;
    firstname: string;
    lastname: string;
    nickname: string;
    abouth: string;
    email: string;
    isActive: boolean;
    memberSinceDate: string;
    membershipEndedDate: string;
    membershipEndedReason: string;
    profileImageUrl: string;
    roleHistory: Array<UserRoleHistoryDto>;
};

export type UserRoleHistoryDto = {
    functionEndDate: string;
    functionStartDate: string;
    role: { name: string; }
};

export class User
{
    public id: string;
    public firstname: string;
    public lastname: string;
    public nickname: string;
    public abouth: string;
    public email: string;
    public isActive: boolean;
    public memberSinceDate: string;
    public membershipEndedDate: string;
    public membershipEndedReason: string;
    public profileImageUrl: string;
    public roleHistory: Array<{
        functionEndDate: string;
        functionStartDate: string;
        role: { name: string; }
    }>;

    constructor(
        id: string,
        firstname: string,
        lastname: string,
        nickname: string,
        abouth: string,
        email: string,
        isActive: boolean,
        memberSinceDate: string,
        membershipEndedDate: string,
        membershipEndedReason: string,
        profileImageUrl: string,
        roleHistory: Array<{
            functionEndDate: string;
            functionStartDate: string;
            role: { name: string; }
        }>
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.nickname = nickname;
        this.abouth = abouth;
        this.email = email;
        this.isActive = isActive;
        this.memberSinceDate = memberSinceDate;
        this.membershipEndedDate = membershipEndedDate;
        this.membershipEndedReason = membershipEndedReason;
        this.profileImageUrl = profileImageUrl;
        this.roleHistory = roleHistory;
    }

    public static fromDto(dto: UserDto): User
    {
        return new User(
            dto.id,
            dto.firstname,
            dto.lastname,
            dto.nickname,
            dto.abouth,
            dto.email,
            dto.isActive,
            dto.memberSinceDate,
            dto.membershipEndedDate,
            dto.membershipEndedReason,
            dto.profileImageUrl,
            dto.roleHistory
        );
    }
}