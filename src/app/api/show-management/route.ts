import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse, NextRequest } from "next/server";
import { env } from "process";

export const POST = withApiAuthRequired(
  async (request: NextRequest) => {
    try {
      const { accessToken } = await getAccessToken(request, new NextResponse());

      const page = await fetch(
        `${env.CMS_API_URL}/showmanagement/show`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(await request.json())
      });

      return NextResponse.json(await page.text());
    } catch {
      return NextResponse.json({ status: 500 });
    }
  }
);