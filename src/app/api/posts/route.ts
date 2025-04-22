import { NextRequest, NextResponse } from 'next/server';
import jsonPlaceholder from '@/helpers/jsonPlaceholder';
import handleErrors from '@/helpers/handleErrors';

async function getPostsHandler(req: NextRequest) {
    const { data } = await jsonPlaceholder.get('/posts');
    const response = NextResponse.json(data, { status: 200 });

    return response;
}

export const GET = handleErrors(getPostsHandler);
