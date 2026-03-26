import "server-only";

import * as jose from "jose";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();

  const userToken = cookieStore.get("accessToken") ?? null;
  const user = jose.decodeJwt(userToken?.value || "");

  return { userToken, user };
};
