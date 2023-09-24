import { fetchGet } from "@/utils/fetch-wrapper";
import { NextRequest } from "next/server";

export const GET = (request: NextRequest) => {
    const limit = request.nextUrl.searchParams.get("limit");
    const pagenumber = request.nextUrl.searchParams.get("page");

    return fetchGet({ path: `usermanagement/User/pagination?IsActive=true&Limit=${limit}&Page=${pagenumber}` });
};
    