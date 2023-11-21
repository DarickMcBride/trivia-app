import { cookies } from "next/headers";

import { getQuestions } from "@/app/lib/data";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const userID = cookieStore.get("user-id");

  const res = await getQuestions(userID?.value || "");

  const resCode = res.status;
  let questions = res.results;

  //trow error if still no token
  if (resCode === 3) {
    throw new Error("Token not found");
  }

  //if token empty reset token and get new questions
  if (resCode === 4) {
    await fetch("http://localhost:3000/api/cookies", { method: "PUT" });
    const res = await getQuestions(userID?.value || "");
    const resCode = res.status;

    //trow error if still no token
    if (resCode === 3) {
      throw new Error("Token not found");
    }

    questions = res.results;
  }

  return Response.json({ questions });
}

export async function PUT(request: Request) {
  const cookieStore = cookies();
  const userID = cookieStore.get("user-id");

  if (!userID) {
    throw new Error("User ID not found");
  }

  const res = await fetch(
    `https://opentdb.com/api_token.php?command=reset&token=${userID?.value}`,
    {
      next: {
        tags: ["token"],
      },
    }
  );

  if (!res.ok) {
    console.error("code:", res.status);
    console.error(res.statusText);

    throw new Error("Failed to reset token");
  }

  return new Response("Reset token successfully");
}
