"use server";

import { cookies } from "next/headers";

export async function deleteCookies(data: string) {
  cookies().delete("isWalletConnected");
  // or
  // or
}
