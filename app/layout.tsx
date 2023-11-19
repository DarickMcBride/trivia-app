import type { Metadata } from "next";
import { Box } from "@mui/material";
import { Roboto } from "next/font/google";
import ThemeRegistry from "@/app/components/theme/ThemeRegistry";
import AppBar from "@/app/components/ui/AppBar";
import DataProvider from "@/app/providers";
import DataFetch from "@/app/components/DataFetch";
import { getQuestions } from "@/app/lib/data";
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Darick's Trivia App",
  description: "Trivia app created by Darick McBride",
};

//shuffle array
function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

//get questions from api
const getAPIQuestions = async (userID: string) => {
  const res = await getQuestions(userID);
  const resCode = res.status;
  console.log("Response Code:", resCode);
  let data = res.results;

  //if token empty reset token and get new questions
  if (resCode === 4) {
    await fetch("http://localhost:3000/api/cookies", { method: "PUT" });
    const res = await getQuestions(userID);
    const resCode = res.status;
    console.log("Response Code:", resCode);
    data = res.results;
  }

  const questions = data.map(
    (
      question: {
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
      },
      index: number
    ) => {
      question.question = question.question;
      question.correct_answer = question.correct_answer;
      question.incorrect_answers = question.incorrect_answers.map(
        (answer) => answer
      );

      const answers = shuffle([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);

      return { id: index, question: question.question, answers: answers };
    }
  );
  return questions;
};

// //get questions from database
// const getDBQuestions = async (userID: string) => {
//   const res = await fetch("/api/questions");

//   const questions = data.map(
//     (
//       question: {
//         question: string;
//         correct_answer: string;
//         incorrect_answers: string[];
//       },
//       index: number
//     ) => {
//       question.question = question.question;
//       question.correct_answer = question.correct_answer;
//       question.incorrect_answers = question.incorrect_answers.map(
//         (answer) => answer
//       );

//       const answers = shuffle([
//         ...question.incorrect_answers,
//         question.correct_answer,
//       ]);

//       return { id: index, question: question.question, answers: answers };
//     }
//   );
//   return questions;
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch("http://localhost:3000/api/cookies", {
    method: "GET",
  });

  //const questions = await getAPIQuestions(res);
  const questions = [];

  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeRegistry>
          <DataProvider>
            <DataFetch data={questions}>
              <Box sx={{ display: "flex" }}>
                <AppBar />
                <Box component="main" sx={{ mt: 10, width: "100%" }}>
                  {children}
                </Box>
              </Box>
            </DataFetch>
          </DataProvider>
        </ThemeRegistry>
        <Analytics />
      </body>
    </html>
  );
}
