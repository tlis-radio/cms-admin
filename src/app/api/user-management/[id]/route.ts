import { fetchGet, fetchPut } from "@/utils/fetch-wrapper";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const GET = withApiAuthRequired(
  async (_, context) => {
    var result = await fetchGet({path: `usermanagement/user/${context.params?.id}`, isAuthorized: true});

    return result;
  }
);

export const PUT = withApiAuthRequired(
  (request, context) => fetchPut({path: `usermanagement/user/${context.params?.id}`, body: request})
);