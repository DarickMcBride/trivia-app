"use server";
import { getQuestions } from "@/app/lib/data";

//submit answer
export async function submitAnswer(
  questionID: number,
  _currentState: any,
  formData: FormData
) {
  const res = await getQuestions();
  const data = res.results;

  const question = data[questionID];

  //const status = data.response_code;
  const correctAnswer = atob(question.correct_answer);

  //get answer-select value
  const answer = formData.get("answer-select");

  console.log(answer);

  //check if answer is correct
  if (answer === correctAnswer) {
    console.log("Correct!");
    return "Correct!";
  } else {
    console.log("Incorrect!");
    return "Incorrect!";
  }
}