import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse, NextRequest } from "next/server";
import { env } from "process";

export const GET = withApiAuthRequired(
    async (request, context) => {
      try {
        const { accessToken } = await getAccessToken(request, new NextResponse());

        const response = await fetch(
          `${env.CMS_API_URL}/showmanagement/show/${context.params?.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        return NextResponse.json(await response.json(), new NextResponse());
      } catch {
        return NextResponse.json({}, { status: 500 });
      }
    }
    // async (request: NextRequest, response: NextResponse, context: { params }) => {
    //   try {
    //     const limit = request.nextUrl.searchParams.get("limit");
    //     const pagenumber = request.nextUrl.searchParams.get("page");
  
    //     const page = await fetch(
    //       `${env.CMS_API_URL}/showmanagement/show/pagination?Limit=${limit}&Page=${pagenumber}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     });
  
    //     return NextResponse.json(await page.json(), response);
    //   } catch {
    //     return NextResponse.json(null, { status: 500 });
    //   }
    // }
  );