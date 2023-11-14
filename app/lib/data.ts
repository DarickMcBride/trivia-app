export async function getQuestions() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple&encode=base64"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  return res.json();
}
