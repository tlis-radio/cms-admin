import { fetchPost, fetchPostFormData } from "@/utils/fetch-wrapper";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

export const POST = withApiAuthRequired(
    async (request: NextRequest) =>  fetchPostFormData({ path: `imageassetmanagement/Image/show-profile`, body: request })
);