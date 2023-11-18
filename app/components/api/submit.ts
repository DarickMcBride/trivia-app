import type { NextApiRequest, NextApiResponse } from "next";
import { getQuestions } from "@/app/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userAnswer = req.body.userAnswer;
  const questionID = req.body.questionID;
  console.log(data);
  console.log(questionID);

  const questions = await getQuestions();
  const question = questions[questionID];

  //const status = data.response_code;
  const correctAnswer = atob(question.correct_answer);

  let message = "";
  if (correctAnswer === userAnswer) {
    message = "Correct!";
  } else {
    message = "Incorrect!";
  }

  res.status(200).json({ message });
}
