export type ShowDto = {
    id: string;
    name: string;
    description: string;
    moderatorIds: Array<string>;
    createdDate: string;
    ProfileImageUrl?: string;
};