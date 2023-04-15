import pgInstance from "@/lib/pgInstance";
import { NextRequest, NextResponse } from "next/server";
import qs from "query-string";

export async function GET(request: NextRequest) {
  try {
    const queryParams = qs.parse(request.nextUrl.searchParams.toString());
    let query = "SELECT * from books";

    if (queryParams.type) {
      query += ` WHERE type='${queryParams.type}'`;
    }

    if (queryParams.limit) {
      query += ` LIMIT ${queryParams.limit}`;
    }

    console.log(query);

    const data = await pgInstance.unsafe(query);

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: error || "Somethineg went wrong" },
      {
        status: 401,
      }
    );
  }
}
