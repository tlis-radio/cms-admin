import { GetByIdUserDto } from "@/types/user";

export class UserDetails
{
    public id: string;
    public firstname: string;
    public lastname: string;
    public nickname: string;
    public abouth: string;
    public profileImageId: string;
    public isActive: boolean;
    public preferNicknameOverName: boolean;
    public externalId: string | null;
    public email: string | null;
    public roleHistory: Array<{
        functionEndDate: string | null;
        functionStartDate: string;
        description: string | null;
        role: { 
            id: string;
            name: string; 
        }
    }>;
    public membershipHistory: Array<{
        description: string | null;
        changeDate: string;
        membership: {
            id: string;
            status: string;
        }
    }>;

    constructor(
        id: string,
        firstname: string,
        lastname: string,
        nickname: string,
        abouth: string,
        email: string | null,
        isActive: boolean,
        profileImageId: string,
        preferNicknameOverName: boolean,
        externalId: string | null,
        roleHistory: Array<{
            functionEndDate: string | null;
            functionStartDate: string;
            description: string | null;
            role: {
                id: string; 
                name: string; 
            }
        }>,
        membershipHistory: Array<{
            description: string | null;
            changeDate: string;
            membership: {
                id: string;
                status: string;
            } 
        }>
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.nickname = nickname;
        this.abouth = abouth;
        this.email = email;
        this.isActive = isActive;
        this.profileImageId = profileImageId;
        this.preferNicknameOverName = preferNicknameOverName;
        this.externalId = externalId;
        this.roleHistory = roleHistory;
        this.membershipHistory = membershipHistory;
    }

    public static fromDto(id: string, dto: GetByIdUserDto): UserDetails
    {
        return new UserDetails(
            id,
            dto.firstname,
            dto.lastname,
            dto.nickname,
            dto.abouth,
            dto.email,
            dto.isActive,
            dto.profileImageId,
            dto.preferNicknameOverName,
            dto.externalId,
            dto.roleHistory,
            dto.membershipHistory
        );
    }
}