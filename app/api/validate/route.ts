import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, url } = body;

        if (!email || !url) {
            return NextResponse.json(
                { error: "Email and URL are required" },
                { status: 400 }
            );
        }

        // Basic mock validation
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isValidUrl = /^(https?:\/\/)?(localhost|[\da-z.-]+)\.?([a-z.]{2,6})?(:[0-9]+)?([/\w .-]*)*\/?$/.test(url);

        if (!isValidEmail) {
            return NextResponse.json(
                { status: "invalid", message: "Invalid email format" },
                { status: 200 }
            );
        }

        if (!isValidUrl) {
            return NextResponse.json(
                { status: "invalid", message: "Invalid URL format" },
                { status: 200 }
            );
        }

        return NextResponse.json({
            status: "valid",
            message: "Validation successful",
            data: {
                email,
                url,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
