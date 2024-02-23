import { PaginationUserDto } from "@/types/user";

export class UserBasicInformations
{
    public id: string;
    public firstname: string;
    public lastname: string;
    public nickname: string;
    public isActive: boolean;
    public email: string;
    public roleHistory: Array<{
        role: {
            id: string; 
            name: string; 
        }
    }>;

    constructor(
        id: string,
        firstname: string,
        lastname: string,
        nickname: string,
        email: string,
        isActive: boolean,
        roleHistory: Array<{
            role:{ 
                id: string;
                name: string; 
            }
        }>
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.nickname = nickname;
        this.email = email;
        this.isActive = isActive;
        this.roleHistory = roleHistory;
    }

    public static fromDto(dto: PaginationUserDto): UserBasicInformations
    {
        return new UserBasicInformations(
            dto.id,
            dto.firstname,
            dto.lastname,
            dto.nickname,
            dto.email,
            dto.isActive,
            dto.roleHistory
        );
    }
}