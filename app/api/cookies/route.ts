import { cookies } from "next/headers";
import { getToken } from "@/app/lib/data";

export async function GET(request: Request) {
  const cookieStore = cookies();
  let userID = cookieStore.get("user-id");

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 400);

  //set cookie for 400 days
  if (!userID) {
    const res = await getToken();

    return new Response("New Cookie Set", {
      status: 200,
      headers: { "Set-Cookie": `user-id=${res.token}` },
    });
  } else {
    return new Response("Cookie Reset", {
      status: 200,
      headers: { "Set-Cookie": `user-id=${userID.value}` },
    });
  }
}
