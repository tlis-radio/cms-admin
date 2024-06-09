import { GetByIdUserDto } from "@/types/user";

export class UserDetails
{
    public id: string;
    public firstname: string;
    public lastname: string;
    public nickname: string;
    public abouth: string;
    public profileImage: {
        id: string;
        url: string;
    };
    public isActive: boolean;
    public preferNicknameOverName: boolean;
    public externalId: string | null;
    public email: string | null;
    public roleHistory: Array<{
        id: string | null;
        functionEndDate: Date | null;
        functionStartDate: Date;
        description: string | null;
        role: { 
            id: string;
            name: string; 
        }
    }>;
    public membershipHistory: Array<{
        id : string | null;
        description: string | null;
        changeDate: Date;
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
        profileImage: {
            id: string;
            url: string;
        },
        preferNicknameOverName: boolean,
        externalId: string | null,
        roleHistory: Array<{
            id: string | null;
            functionEndDate: string | null;
            functionStartDate: string;
            description: string | null;
            role: {
                id: string; 
                name: string; 
            }
        }>,
        membershipHistory: Array<{
            id: string | null;
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
        this.profileImage = profileImage;
        this.preferNicknameOverName = preferNicknameOverName;
        this.externalId = externalId;
        this.roleHistory = roleHistory.map((history) => {
            return {
                id: history.id,
                functionEndDate: history.functionEndDate ? new Date(history.functionEndDate) : null,
                functionStartDate: new Date(history.functionStartDate),
                description: history.description,
                role: { id: history.role.id, name: history.role.name }
            }
        });
        this.membershipHistory = membershipHistory.map((history) => {
            return {
                id: history.id,
                changeDate: new Date(history.changeDate),
                description: history.description,
                membership: { id: history.membership.id, status: history.membership.status }
            }
        });
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
            dto.profileImage,
            dto.preferNicknameOverName,
            dto.externalId,
            dto.roleHistory,
            dto.membershipHistory
        );
    }
}