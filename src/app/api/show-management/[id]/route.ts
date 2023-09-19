import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
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

      return NextResponse.json(await response.json());
    } catch {
      return NextResponse.json({}, { status: 500 });
    }
  }
);