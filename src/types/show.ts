export type CreateShowDto = {
   name: string,
   description: string,
   moderatorIds: Array<string>
};

export type UpdateShowDto = {
   name: string,
   description: string,
   moderatorIds: Array<string>
};

export type ShowDto = {
   id: string,
   name: string,
   description: string,
   moderators: Array<ShowModeratorDto>,
   createdDate: string,
   profileImageUrl?: string
};

export type ShowModeratorDto = {
   id: string,
   nickName: string
};