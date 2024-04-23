import { PaginationUserDto } from "@/types/user";

export class UserBasicInformations
{
    public id: string;
    public firstname: string;
    public lastname: string;
    public nickname: string;
    public email: string;
    public roles: Array<string>;
    public status: string;

    constructor(
        id: string,
        firstname: string,
        lastname: string,
        nickname: string,
        email: string,
        roles: Array<string>,
        status: string
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.nickname = nickname;
        this.email = email;
        this.roles = roles;
        this.status = status;
    }

    public static fromDto(dto: PaginationUserDto): UserBasicInformations
    {
        return new UserBasicInformations(
            dto.id,
            dto.firstname,
            dto.lastname,
            dto.nickname,
            dto.email,
            dto.roles,
            dto.status
        );
    }
}