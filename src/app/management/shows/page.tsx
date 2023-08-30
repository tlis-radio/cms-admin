'use client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { FunctionComponent } from "react";

const Shows: FunctionComponent = () => {
    return <p>Shows</p>
};
  
export default withPageAuthRequired(Shows);