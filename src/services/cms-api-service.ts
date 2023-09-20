import { Pagination, PaginationDto } from "@/models/pagination";
import { Show, ShowDto } from "@/models/show";
import { User, UserDto } from "@/models/user";

const getAsync = async <T>(uri: string) : Promise<T> =>
{
    const response = await fetch(uri);

    return response.json();
}

const showEndpoints = {
    PaginationAsync: async (limit: number, page: number) : Promise<Pagination<Show>> => {
        const result = await getAsync<PaginationDto<ShowDto>>(`/api/show-management/pagination?limit=${limit}&page=${[page]}`);

        return new Pagination<Show>(
            result.limit,
            result.page,
            result.total,
            result.totalPages,
            result.results.map(r => Show.fromDto(r))
        );
    },
    GetByIdAsync: async (id: string | null) : Promise<Show | undefined> => {
        if (!id) {
            return undefined;
        }

        const result = await getAsync<ShowDto>(`/api/show-management/${id}`);

        return Show.fromDto(result);
    }
};

const userEndpoints = {
    PaginationAsync: async (limit: number, page: number) : Promise<Pagination<User>> => {
        const result = await getAsync<PaginationDto<UserDto>>(`/api/user-management/pagination?limit=${limit}&page=${[page]}`);

        return new Pagination<User>(
            result.limit,
            result.page,
            result.total,
            result.totalPages,
            result.results.map(r => User.fromDto(r))
        );
    }
};


class CmsApiService
{
    static Show = showEndpoints;

    static User = userEndpoints;

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
}

export default CmsApiService;