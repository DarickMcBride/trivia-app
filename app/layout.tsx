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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
