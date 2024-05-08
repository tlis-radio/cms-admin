import { fetchGet } from "@/utils/fetch-wrapper";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

export const GET = withApiAuthRequired(
  async (request: NextRequest) => fetchGet({ path: `usermanagement/Membership`, isAuthorized: true })
);