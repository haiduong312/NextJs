import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const fileName = searchParams.get("audio");
    // fetch tracks from remote server
    return await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${fileName}`
    );
}
