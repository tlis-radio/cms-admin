import { fetchDelete, fetchGet, fetchPut } from "@/utils/fetch-wrapper";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const PUT = withApiAuthRequired(
  (request, context) => fetchPut({path: `programmanagement/user/${context.params?.id}/image`, body: request})
);