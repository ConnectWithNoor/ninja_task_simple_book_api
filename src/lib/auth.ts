import { jwtVerify } from "jose";
import pgInstance from "./pgInstance";

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!)
    );

    const query = `SELECT * FROM users WHERE email = '${verified.payload.email}'`;
    const decodedUser = await pgInstance.unsafe(query);

    return decodedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
