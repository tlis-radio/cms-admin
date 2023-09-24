import { fetchGet, fetchPut } from "@/utils/fetch-wrapper";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const GET = withApiAuthRequired(
  (_, context) => fetchGet({path: `showmanagement/show/${context.params?.id}`, isAuthorized: true})
);

export const PUT = withApiAuthRequired(
  (request, context) => fetchPut({path: `showmanagement/show/${context.params?.id}`, body: request})
);