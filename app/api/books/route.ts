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

    const data = await pgInstance.unsafe(query);

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { error: error.message || "Somethineg went wrong" },
      {
        status: 500,
      }
    );
  }
}
