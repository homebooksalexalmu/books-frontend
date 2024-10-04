import { NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0/edge';

const GET = withApiAuthRequired(async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ idToken: undefined }, { status: 400 });
    const { idToken = undefined } = session;
    return NextResponse.json({ idToken }, { status: 200 });
});

export { GET };