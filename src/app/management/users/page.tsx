'use client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { FunctionComponent } from "react";

const Users: FunctionComponent = () => {
    return <p>Users</p>
};
  
export default withPageAuthRequired(Users);