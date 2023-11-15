import TriviaForm from "@/app/components/ui/TriviaForm";
import { Container } from "@mui/material";
import { getQuestions } from "@/app/lib/data";

//shuffle array
function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

//decode base64 string
function atob(str: string) {
  return Buffer.from(str, "base64").toString("binary");
}

export default async function Page() {
  const res = await getQuestions();
  const data = res.results;
  //const status = data.response_code;

  const questions = data.map(
    (
      question: {
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
      },
      index: number
    ) => {
      question.question = atob(question.question);
      question.correct_answer = atob(question.correct_answer);
      question.incorrect_answers = question.incorrect_answers.map((answer) =>
        atob(answer)
      );

      const answers = shuffle([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);

      return { id: index, question: question.question, answers: answers };
    }
  );

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TriviaForm data={questions} />
    </Container>
  );
}
