export type UserDto = {
    id: string;
    description: string;
    email: string;
    firstname: string;
    isActive: boolean;
    lastname: string;
    memberSinceDate: string;
    membershipEndedDate: string;
    membershipEndedReason: string;
    nickname: string;
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
    public description: string;
    public email: string;
    public firstname: string;
    public isActive: boolean;
    public lastname: string;
    public memberSinceDate: string;
    public membershipEndedDate: string;
    public membershipEndedReason: string;
    public nickname: string;
    public profileImageUrl: string;
    public roleHistory: Array<{
        functionEndDate: string;
        functionStartDate: string;
        role: { name: string; }
    }>;

    constructor(
        id: string,
        description: string,
        email: string,
        firstname: string,
        isActive: boolean,
        lastname: string,
        memberSinceDate: string,
        membershipEndedDate: string,
        membershipEndedReason: string,
        nickname: string,
        profileImageUrl: string,
        roleHistory: Array<{
            functionEndDate: string;
            functionStartDate: string;
            role: { name: string; }
        }>
    ) {
        this.id = id;
        this.description = description;
        this.email = email;
        this.firstname = firstname;
        this.isActive = isActive;
        this.lastname = lastname;
        this.memberSinceDate = memberSinceDate;
        this.membershipEndedDate = membershipEndedDate;
        this.membershipEndedReason = membershipEndedReason;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.roleHistory = roleHistory;
    }

    public static fromDto(dto: UserDto): User
    {
        return new User(
            dto.id,
            dto.description,
            dto.email,
            dto.firstname,
            dto.isActive,
            dto.lastname,
            dto.memberSinceDate,
            dto.membershipEndedDate,
            dto.membershipEndedReason,
            dto.nickname,
            dto.profileImageUrl,
            dto.roleHistory
        );
    }
}