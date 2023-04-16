import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pgInstance from "@/src/lib/pgInstance";

type Body = {
  clientName?: string;
  clientEmail?: string;
};

// submit a new order
export async function POST(request: NextRequest) {
  try {
    const { clientName, clientEmail } = (await request.json()) as Body;

    if (!clientName || !clientEmail) {
      return NextResponse.json(
        { error: "required fields missing." },
        {
          status: 401,
        }
      );
    }

    const query = `INSERT INTO "users" (name, email) VALUES ('${clientName}', '${clientEmail}') returning *`;
    await pgInstance.unsafe(query);

    const accessToken = jwt.sign(
      {
        email: clientEmail,
      },
      process.env.ACCESS_TOKEN_SECRET || "",
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { accessToken },
      {
        status: 200,
      }
    );
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
