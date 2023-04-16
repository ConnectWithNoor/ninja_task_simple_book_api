import pgInstance from "@/src/lib/pgInstance";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  orderId?: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { orderId } = params;

    // to be implemented after authentication

    return NextResponse.json(orderId, {
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { orderId } = params;
    const { createdBy, customerName } = await request.json();

    const query = `
    UPDATE orders
    SET customer_name = '${customerName}'
    WHERE id = ${orderId}
    AND createdBy = ${createdBy}
    returning *
    ;
    `;

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { orderId } = params;

    // to be implemented after authentication

    return NextResponse.json(orderId, {
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
