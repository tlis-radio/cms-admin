import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

type fetchGet = {
    path: string;
    isAuthorized?: boolean
};


export const fetchGet = async (props: fetchGet) => {
    if (props.isAuthorized)
    {
        const { accessToken } = await getAccessToken();

        return callFetch({
            path: props.path,
            method: "GET",
            accessToken
        });
    }

    return callFetch({ path: props.path, method: "GET" });
}

type fetchPost = {
    path: string;
    body: NextRequest
}

export const fetchPost = async (props: fetchPost) => {
    const { accessToken } = await getAccessToken();

    return callFetch({
        path: props.path,
        method: "POST",
        body: props.body,
        accessToken
    });
};

type fetchPut = {
    path: string;
    body: NextRequest
}

export const fetchPut = async (props: fetchPut) => {
    const { accessToken } = await getAccessToken();

    return callFetch({
        path: props.path,
        method: "PUT",
        body: props.body,
        accessToken
    });
};

type callFetchProps = {
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: NextRequest,
    accessToken?: string,
};

const callFetch = async (props: callFetchProps) => {
    try
    {
        let headers: HeadersInit = {
            'Content-Type': 'application/json'
        };

        if (props.accessToken) {
            headers.Authorization = `Bearer ${props.accessToken}`;
        }
        
        const response = await fetch(
            `${env.CMS_API_URL}/${props.path}`, {
            method: props.method,
            headers,
            body: props.body ? JSON.stringify(await props.body.json()) : undefined
        });

        if (response.status < 300) {
            if (response.status === 204) {
            return NextResponse.json({}, { status: 200, statusText: response.statusText });
            }

            return NextResponse.json(await response.json());
        }

        return NextResponse.json({}, { status: response.status, statusText: response.statusText });
    }
    catch (error)
    {
      return NextResponse.json({}, { status: 500 })
    }
};