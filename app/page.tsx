import TriviaForm from "./components/ui/TriviaForm";
import { Container } from "@mui/material";

async function getQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=10");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch questions");
  }

  return res.json();
}

export default async function Page() {
  const data = await getQuestions();
  const questions = data.results;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TriviaForm question={questions[0].question.replaceAll("&quot;", '"')} />
    </Container>
  );
}
