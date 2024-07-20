import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

type fetchDelete = {
    path: string;
}

export const fetchDelete = async (props: fetchDelete) => {
    const { accessToken } = await getAccessToken();

    return callFetch({
        path: props.path,
        method: "DELETE",
        contentType: "application/json",
        accessToken
    });
}

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
            contentType: "application/json",
            accessToken
        });
    }

    return callFetch({ path: props.path, method: "GET", contentType: "application/json" });
}

type fetchPost = {
    path: string;
    body: NextRequest
}

export const fetchPostFormData = async (props: fetchPost) => {
    const { accessToken } = await getAccessToken();

    return callFetch({
        path: props.path,
        method: "POST",
        body: props.body,
        contentType: "multipart/form-data",
        accessToken
    });
};

export const fetchPost = async (props: fetchPost) => {
    const { accessToken } = await getAccessToken();

    return callFetch({
        path: props.path,
        method: "POST",
        body: props.body,
        contentType: "application/json",
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
        contentType: "application/json",
        accessToken
    });
};

type callFetchProps = {
    path: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    contentType: "application/json" | "multipart/form-data",
    body?: NextRequest,
    accessToken?: string
};

const callFetch = async (props: callFetchProps) => {
    try
    {
        let headers: HeadersInit = props.contentType === "multipart/form-data"
        ? {} : {
            'Content-Type': props.contentType
        };

        if (props.accessToken) {
            headers.Authorization = `Bearer ${props.accessToken}`;
        }
        
        const response = await fetch(
            `${env.CMS_API_URL}/${props.path}`, {
            method: props.method,
            headers,
            body: await getBody(props)
        });

        if (response.status < 300) {
            if (response.status === 204) {
                return NextResponse.json({}, { status: 200, statusText: response.statusText });
            }
        }

        var message = await response.json();
        if (message)
        {
            return NextResponse.json(message, { status: response.status });
        }

        return NextResponse.json({}, { status: response.status, statusText: response.statusText });
    }
    catch (error)
    {
      return NextResponse.json({}, { status: 500 })
    }
};

const getBody = async (props: callFetchProps): Promise<any | null> => {
    if (props.contentType == "multipart/form-data")
    {
        return props.body?.formData();
    }

    return props.body ? JSON.stringify(await props.body.json()) : undefined;
}