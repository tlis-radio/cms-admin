export type ShowDto = {
    id: string;
    name: string;
    description: string;
    moderators: Array<{ id: string, nickName: string }>;
    createdDate: string;
    ProfileImageUrl?: string;
};