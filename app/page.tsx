import TriviaForm from "./components/ui/TriviaForm";
import { Container } from "@mui/material";
import { getQuestions } from "./lib/data";

//shuffle array
function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

//decode base64 string
function atob(str: string) {
  return Buffer.from(str, "base64").toString("binary");
}

export default async function Page() {
  const data = await getQuestions();
  //const status = data.response_code;

  const questions = data.results;

  const question: string = atob(
    questions[0].question.replaceAll("&quot;", '"')
  );
  const answer: string = atob(questions[0].correct_answer);
  const incorrectAnswers: string[] = questions[0].incorrect_answers.map(
    (a: string) => atob(a)
  );
  const answers: string[] = shuffle([...incorrectAnswers, answer]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TriviaForm question={question} answers={answers} />
    </Container>
  );
}
