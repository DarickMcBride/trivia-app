"use server";
import "server-only";

export async function getQuestions() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple",
    {
      cache: "force-cache",
      next: {
        tags: ["questions"],
      },
    }
  );

  if (!res.ok) {
    console.error(res);
    console.error("code:", res.status);
    console.error(res.statusText);

    throw new Error("Failed to fetch questions");
  }

  return res.json();
}
