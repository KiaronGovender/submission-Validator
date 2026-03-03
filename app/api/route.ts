import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.data || typeof body.data !== "string") {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400 }
    );
  }

  const sorted = body.data
    .split("")
    .sort();

  return NextResponse.json({
    word: sorted
  });
}