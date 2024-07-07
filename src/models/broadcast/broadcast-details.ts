import { GetByIdBroadcastDto } from "@/types/broadcast";

export class BroadcastDetails
{
    public id: string;
    public name: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public show: {
        id: string;
        name: string;
    }

    constructor(
        id: string,
        name: string,
        description: string,
        startDate: string,
        endDate: string,
        show: { id: string, name: string }
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.show = { id: show.id, name: show.name };
    }

    public static fromDto(id: string, dto: GetByIdBroadcastDto): BroadcastDetails
    {
        return new BroadcastDetails(
            id,
            dto.name,
            dto.description,
            dto.startDate,
            dto.endDate,
            dto.show
        );
    }
}