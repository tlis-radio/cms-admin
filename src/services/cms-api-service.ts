import { Pagination, PaginationDto } from "@/models/pagination";
import { Show, ShowDto } from "@/models/show";

const getAsync = async <T>(uri: string) : Promise<T> =>
{
    const response = await fetch(uri);

    return response.json();
}

const showEndpoints = {
    PaginationAsync: async (limit: number, page: number) : Promise<Pagination<Show>> =>
    {
        const result = await getAsync<PaginationDto<ShowDto>>(`/api/show-management/pagination?limit=${limit}&page=${[page]}`);

        return new Pagination<Show>(
            result.limit,
            result.page,
            result.total,
            result.totalPages,
            result.results.map(r => Show.fromDto(r))
        );
    }
};

class CmsApiService
{
    static Show = showEndpoints;

    public static async PostAsync(uri: string, body: any) : Promise<void>
    {
        const response = await fetch(
            uri,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

        await response;
    }

    public static async GetAsync<T>(uri: string) : Promise<T>
    {
        const response = await fetch(uri);

        return response.json();
    }
}

export default CmsApiService;