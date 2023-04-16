import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  try {
    const authToken = request.headers.get("authorization")?.split(" ")[1];

    const decodedUser = authToken && (await verifyAuth(authToken));

    if (!decodedUser) {
      return NextResponse.json(
        { error: "not permitted" },
        {
          status: 401,
        }
      );
    }

    console.log(decodedUser);

    return NextResponse.next();
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}

export const config = {
  matcher: ["/api/orders/:path*"],
};
