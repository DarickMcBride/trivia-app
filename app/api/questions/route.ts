import { cookies } from "next/headers";

import { getQuestions } from "@/app/lib/data";

export async function GET(request: Request) {
  const cookieStore = cookies();
  let userID = cookieStore.get("user-id");

  const res = await getQuestions(userID?.value || "");

  const resCode = res.status;
  let questions = res.results;

  //if token empty reset token and get new questions
  if (resCode === 4) {
    await fetch("http://localhost:3000/api/cookies", { method: "PUT" });
    const res = await getQuestions(userID?.value || "");
    const resCode = res.status;
    console.log("Response Code:", resCode);
    questions = res.results;
  }

  return Response.json({ questions });
}
