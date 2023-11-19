"use server";
import "server-only";
import { cookies } from "next/headers";
import { getQuestions, getToken, resetToken } from "@/app/lib/data";

//submit answer
export async function submitAnswer(prevState: any, formData: FormData) {
  try {
    const id = formData.get("question-id");
    const answer = formData.get("answer-select");
    const userID = formData.get("user-id");

    if (!userID) {
      throw new Error("User ID not found");
    }

    const res = await getQuestions(userID?.toString());
    const data = res.results;

    const question = data[id?.toString() || -1];

    if (!question) {
      return;
    }

    console.log("Response Code:", res.response_code);

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
