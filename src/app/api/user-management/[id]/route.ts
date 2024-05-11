import { fetchGet, fetchPut } from "@/utils/fetch-wrapper";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const GET = withApiAuthRequired(
  async (_, context) => fetchGet({path: `usermanagement/user/${context.params?.id}`, isAuthorized: true})
);

export const PUT = withApiAuthRequired(
  async (request, context) => fetchPut({path: `usermanagement/user/${context.params?.id}`, body: request})
);