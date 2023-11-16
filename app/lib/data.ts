export async function getQuestions() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple&encode=base64",
    {
      next: {
        tags: ["blog"], // Invalidate with revalidateTag('blog') on-demand
      },
    }
  );

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error("Failed to fetch questions");
  }

  return res.json();
}
