import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse, NextRequest } from "next/server";
import { env } from "process";

const withApiAuthRequiredExtended = withApiAuthRequired as any;

export const POST = withApiAuthRequiredExtended(
  async (request: NextRequest, response: NextResponse) => {
    try {
      const { accessToken } = await getAccessToken(request, response);

      const page = await fetch(
        `${env.CMS_API_URL}/showmanagement/show`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(await request.json())
      });

      return NextResponse.json(await page.text(), response);
    } catch {
      return NextResponse.json(null, { status: 500 });
    }
  }
);