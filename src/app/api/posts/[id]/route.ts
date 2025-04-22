import { NextRequest, NextResponse } from 'next/server';
import jsonPlaceholder from '@/helpers/jsonPlaceholder';
import handleErrors from '@/helpers/handleErrors';

async function getPostHandler(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const { data } = await jsonPlaceholder.get(`/posts/${id}`);
    const response = NextResponse.json(data, { status: 200 });

    return response;
}

async function updatePostHandler(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const { title, body } = await req.json();

    const { data } = await jsonPlaceholder.put(`/posts/${id}`, {
        id,
        title,
        body,
        userId: 1,
    });

    return NextResponse.json(data, { status: 200 });
}

async function deletePostHandler(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    await jsonPlaceholder.delete(`/posts/${id}`);

    return new NextResponse(null, { status: 204 });
}

export const GET = handleErrors(getPostHandler);
export const PUT = handleErrors(updatePostHandler);
export const DELETE = handleErrors(deletePostHandler);