import { jwtVerify } from "jose";

export async function verifyAuth(token: string) {
  try {
    const decodedToken = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!)
    );

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({ decodedToken: decodedToken.payload }),
    });

    const decodedUser = await response.json();

    return decodedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
