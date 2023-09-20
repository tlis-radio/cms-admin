import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

export const GET = async (request: NextRequest) => {
    try {
        const limit = request.nextUrl.searchParams.get("limit");
        const pagenumber = request.nextUrl.searchParams.get("page");

        const response = await fetch(
            `${env.CMS_API_URL}/showmanagement/show/pagination?Limit=${limit}&Page=${pagenumber}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        });

        return NextResponse.json(await response.json());
    } catch {
        return NextResponse.json({ status: 500 });
    }
};
    