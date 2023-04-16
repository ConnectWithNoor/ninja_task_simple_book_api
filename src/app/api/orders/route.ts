import pgInstance from "@/src/lib/pgInstance";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  bookId?: string;
  customerName?: string;
  createdBy?: string;
};

// submit a new order
export async function POST(request: NextRequest) {
  try {
    const { bookId, customerName, createdBy } = (await request.json()) as Body;

    if (!bookId || !customerName || !createdBy) {
      return NextResponse.json(
        { error: "required fields missing." },
        {
          status: 403,
        }
      );
    }

    const query = `INSERT INTO "orders" (createdBy, bookId, customer_name, quantity)
VALUES (${createdBy}, ${bookId}, '${customerName}', 1) returning *`;

    const response = await pgInstance.unsafe(query);

    return NextResponse.json(response, {
      status: 201,
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

// get all orders
export async function GET(request: NextRequest) {
  try {
    // to be implemented after authentication

    return NextResponse.json("Hello", {
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
