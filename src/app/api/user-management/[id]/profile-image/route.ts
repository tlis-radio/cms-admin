import { fetchDelete, fetchGet, fetchPut } from "@/utils/fetch-wrapper";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const PUT = withApiAuthRequired(
  (request, context) => fetchPut({path: `usermanagement/user/${context.params?.id}/profile-image`, body: request})
);