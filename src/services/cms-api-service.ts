import { Broadcast } from "@/models/broadcast/broadcast";
import { BroadcastDetails } from "@/models/broadcast/broadcast-details";
import { Pagination, PaginationDto } from "@/models/pagination";
import { Show } from "@/models/show";
import { UserBasicInformations } from "@/models/user/user-basic-informations";
import { UserDetails } from "@/models/user/user-details";
import { BroadcastDto, CreateBroadcastDto, GetByIdBroadcastDto, UpdateBroadcastDto, UpdateImageBroadcastDto } from "@/types/broadcast";
import { CreateResponse } from "@/types/cms-api-base-response";
import { AllMemberships } from "@/types/membership";
import { AllRoles } from "@/types/role";
import { CreateShowDto, ShowDto, UpdateProfileImageShowDto, UpdateShowDto } from "@/types/show";
import { GetByIdUserDto, UpdateUserDto, PaginationUserDto, CreateUserDto } from "@/types/user";

const deleteAsync = async (uri: string) : Promise<void> =>
{
    const response = await fetch(uri, { method: "DELETE" });

    if (response.status >= 400) {
        throw new Error(response.statusText);
    }
}

const getAsync = async <T>(uri: string) : Promise<T> =>
{
    const response = await fetch(uri);

    if (response.status >= 400) {
        throw new Error(response.statusText);
    }

    return response.json();
}

const postAsync = async <T, U>(uri: string, body: T) : Promise<U> =>
{
    var response = await fetch(
        uri,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

    if (response.status >= 400) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

const putAsync = async <T>(uri: string, body: T) : Promise<void> =>
{
    var response = await fetch(
        uri,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

    if (response.status >= 400) {
        throw new Error(response.statusText);
    }
}

const imageEndpoints = {
    UploadUserProfileImageAsync: async (image: File, userId: string) : Promise<CreateResponse> => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("userId", userId);

        const response = await fetch("/api/image-asset-management/user-profile", {
            method: "POST",
            body: formData
        });

        if (response.status >= 400) {
            throw new Error(response.statusText);
        }

        return await response.json();
    },
    UploadShowProfileImageAsync: async (image: File, userId: string) : Promise<CreateResponse> => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("showId", userId);

        const response = await fetch("/api/image-asset-management/show-profile", {
            method: "POST",
            body: formData
        });

        if (response.status >= 400) {
            throw new Error(response.statusText);
        }

        return await response.json();
    }
};

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
    },
    CreateNewAsync: async (dto: CreateShowDto) : Promise<CreateResponse> => 
        await postAsync<CreateShowDto, CreateResponse>("/api/show-management", dto),
    UpdateAsync: async (id: string, dto: UpdateShowDto) : Promise<void> => {
        await putAsync(`/api/show-management/${id}`, dto);
    },
    UpdateProfileImageAsync: async (id: string, dto: UpdateProfileImageShowDto) : Promise<void> => {
        await putAsync(`/api/show-management/${id}/profile-image`, dto);
    },
    DeleteAsync: async (id: string) : Promise<void> => {
        await deleteAsync(`/api/show-management/${id}`);
    }
};

const broadcastEndpoints = {
    PaginationAsync: async (limit: number, page: number) : Promise<Pagination<Broadcast>> => {
        const result = await getAsync<PaginationDto<BroadcastDto>>(`/api/broadcast-management/pagination?limit=${limit}&page=${[page]}`);

        return new Pagination<Broadcast>(
            result.limit,
            result.page,
            result.total,
            result.totalPages,
            result.results.map(r => Broadcast.fromDto(r))
        );
    },
    GetByIdAsync: async (id: string | null) : Promise<BroadcastDetails | undefined> => {
        if (!id) {
            return undefined;
        }

        const result = await getAsync<GetByIdBroadcastDto>(`/api/broadcast-management/${id}`);

        return BroadcastDetails.fromDto(id, result);
    },
    CreateNewAsync: async (dto: CreateBroadcastDto) : Promise<CreateResponse> => 
        await postAsync<CreateBroadcastDto, CreateResponse>("/api/broadcast-management", dto),
    UpdateAsync: async (id: string, dto: UpdateBroadcastDto) : Promise<void> => {
        await putAsync(`/api/broadcast-management/${id}`, dto);
    },
    UpdateProfileImageAsync: async (id: string, dto: UpdateImageBroadcastDto) : Promise<void> => {
        await putAsync(`/api/broadcast-management/${id}/image`, dto);
    },
    DeleteAsync: async (id: string) : Promise<void> => {
        await deleteAsync(`/api/broadcast-management/${id}`);
    }
};

const userEndpoints = {
    PaginationAsync: async (limit: number, page: number) : Promise<Pagination<UserBasicInformations>> => {
        const result = await getAsync<PaginationDto<PaginationUserDto>>(`/api/user-management/pagination?limit=${limit}&page=${[page]}`);

        return new Pagination<UserBasicInformations>(
            result.limit,
            result.page,
            result.total,
            result.totalPages,
            result.results.map(r => UserBasicInformations.fromDto(r))
        );
    },
    GetByIdAsync: async (id: string | null) : Promise<UserDetails | undefined> => {
        if (!id) {
            return undefined;
        }

        const result = await getAsync<GetByIdUserDto>(`/api/user-management/${id}`);

        return UserDetails.fromDto(id, result);
    },
    CreateNewActiveAsync: async (dto: CreateUserDto) : Promise<CreateResponse> =>
        await postAsync<CreateUserDto, CreateResponse>("/api/user-management", dto),
    UpdateAsync: async (id: string, dto: UpdateUserDto) : Promise<void> => {
        await putAsync(`/api/user-management/${id}`, dto);
    },
    GetRolesAsync: async () : Promise<AllRoles> => {
        return await getAsync<AllRoles>("/api/user-management/all-roles");
    },
    GetMembershipsAsync: async () : Promise<AllMemberships> => {
        return await getAsync<AllMemberships>("/api/user-management/all-memberships");
    },
    UpdateProfileImageAsync: async (id: string, dto: UpdateProfileImageShowDto) : Promise<void> => {
        await putAsync(`/api/user-management/${id}/profile-image`, dto);
    },
    DeleteAsync: async (id: string) : Promise<void> => {
        await deleteAsync(`/api/user-management/${id}`);
    }
};


class CmsApiService
{
    static Show = showEndpoints;

    static User = userEndpoints;

    static Image = imageEndpoints;

    static Broadcast = broadcastEndpoints;
}

export default CmsApiService;