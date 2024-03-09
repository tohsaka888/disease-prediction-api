"use server";
import { cookies } from "next/headers";

export async function cacheEmailCode(data: UserType.UserCache) {
  // max-age 5min
  cookies().set({
    name: data.email,
    value: data.code,
    maxAge: 5 * 60,
  });
}

export async function getEmailCode(email: string) {
  return cookies().get(email)?.value;
}
