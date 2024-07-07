export type BroadcastDto = {
    id: string,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    showId: string
};
 
export type GetByIdBroadcastDto = {
    id: string,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    show: GetByIdBroadcastDtoShow
};

export type GetByIdBroadcastDtoShow = {
    id: string;
    name: string;
};

export type CreateBroadcastDto = {
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    showId: string;
};

export type UpdateImageBroadcastDto = {
    imageId: string;
};

 export type UpdateBroadcastDto = {
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    showId: string;
};