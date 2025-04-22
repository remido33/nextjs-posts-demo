import { NextRequest, NextResponse } from 'next/server';

const handleErrors = (fn: (req: NextRequest, other?: any) => Promise<NextResponse>) => (
    async (req: NextRequest, other?: any) => {
        try {
            return await fn(req, other);
        } catch (err: any) {
            if (err?.status && err?.message) {
                const { status, message } = err as { status: number; message: string };
                return NextResponse.json({ message }, { status });
            }
            console.error('Handle error:', err)
            return NextResponse.json({ message: 'An unknown error occurred.' }, { status: 500 });
        }
    }
);

export default handleErrors;
