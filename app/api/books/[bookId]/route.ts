import pgInstance from "@/lib/pgInstance";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  bookId?: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { bookId } = params;
    const query = `SELECT * FROM books WHERE id = ${bookId}`;

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
