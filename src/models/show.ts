export type ShowDto = {
    id: string,
    name: string,
    description: string,
    moderators: Array<ShowModeratorDto>,
    createdDate: string,
    profileImageUrl?: string
}

export type ShowModeratorDto = {
    id: string,
    nickName: string
};

export class Show
{
    public id: string;
    public name: string;
    public description: string;
    public moderators: Array<{ id: string, nickName: string }>;
    public createdDate: string;
    public profileImageUrl?: string;

    constructor(
        id: string,
        name: string,
        description: string,
        moderators: Array<{ id: string, nickName: string }>,
        createdDate: string,
        profileImageUrl?: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.moderators = moderators;
        this.createdDate = createdDate;
        this.profileImageUrl = profileImageUrl;
    }

    public static fromDto(dto: ShowDto): Show
    {
        return new Show(
            dto.id,
            dto.name,
            dto.description,
            dto.moderators,
            dto.createdDate,
            dto.profileImageUrl
        );
    }
}