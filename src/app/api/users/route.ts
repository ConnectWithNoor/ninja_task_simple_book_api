import pgInstance from "@/src/lib/pgInstance";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { decodedToken } = await req.json();

    if (!decodedToken) {
      throw new Error("You are not permitted");
    }

    const query = `SELECT * from users WHERE email = '${decodedToken.email}'`;

    const decodedUser = await pgInstance.unsafe(query);

    return NextResponse.json(decodedUser[0]);
  } catch (error) {
    console.log(error);
    throw new Error("You are not permitted");
  }
}
