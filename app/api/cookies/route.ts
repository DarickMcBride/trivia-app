import { setCookie, getCookie } from "cookies-next";
import { getToken, resetToken } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  const token = getCookie("user-id", { res, req });
  console.log("userID:", token);
  return res;
}

export async function POST(req: NextRequest) {
  const res = new NextResponse();
  let userID = getCookie("user-id");
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 400);

  //set cookie for 400 days
  if (!userID) {
    const res = await getToken();
    console.log("token:", res.token);

    const id = res.token.id;
    userID = id;

    setCookie("user-id", id, {
      res,
      req,
    });
  } else {
    setCookie("user-id", userID, {
      res,
      req,
    });
  }
  return res.json();
}

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("user-id");
  await resetToken(token);
  return new NextResponse("reset");
}
