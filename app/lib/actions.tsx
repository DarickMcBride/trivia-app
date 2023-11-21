"use server";
import "server-only";
import { getQuestions } from "@/app/lib/data";

//submit answer
export async function submitAnswer(prevState: any, formData: FormData) {
  try {


    const id = formData.get("id");
    const answer = formData.get("answer-select");

    const question = data[id?.toString() || -1];

    if (!question) {
      return;
    }

    //const status = data.response_code;
    const correctAnswer = question.correct_answer;

    //check if answer is correct
    if (answer === correctAnswer) {
      return { message: "Correct!" };
    } else {
      return { message: "Incorrect!" };
    }
  } catch (error: any) {
    console.error(error);
    return { message: error.message };
  }
}
