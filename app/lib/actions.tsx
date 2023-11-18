"use server";
import { getQuestions } from "@/app/lib/data";

//submit answer
export async function submitAnswer(prevState: any, formData: FormData) {
  try {
    const res = await getQuestions();
    const data = res.results;
    const questionID = formData.get("id");

    console.log(questionID);

    //const question = data[questionID];

    //const status = data.response_code;
    //const correctAnswer = atob(question.correct_answer);

    //get answer-select value
    //const answer = formData.get("answer-select");

    //check if answer is correct
    // if (answer === correctAnswer) {
    //   return { message: "Correct!" };
    // } else {
    //   return { message: "Incorrect!" };
    // }
  } catch (e) {
    console.error(e);
    return { message: "Something went wrong!" };
  }
}
