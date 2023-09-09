import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse, NextRequest } from "next/server";
import { env } from "process";

const withApiAuthRequiredExtended = withApiAuthRequired as any;

export const GET = withApiAuthRequiredExtended(
  async (request: NextRequest, response: NextResponse) => {
    try {
      const limit = request.nextUrl.searchParams.get("limit");
      const pagenumber = request.nextUrl.searchParams.get("page");

      const { accessToken } = await getAccessToken(request, response);

      const page = await fetch(
        `${env.CMS_API_URL}/usermanagement/User/pagination?IsActive=true&Limit=${limit}&Page=${pagenumber}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      return NextResponse.json(await page.json(), response);
    } catch (error) {
      return new Response(null, { status: 500 });
    }
  }
);