import type { Metadata } from "next";
import { Box } from "@mui/material";
import { Roboto } from "next/font/google";
import ThemeRegistry from "@/app/components/theme/ThemeRegistry";
import AppBar from "@/app/components/ui/AppBar";
import DataProvider from "@/app/lib/providers";
import Main from "@/app/lib/main";
import { getQuestions } from "@/app/lib/data";

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

//decode base64 string
function atob(str: string) {
  return Buffer.from(str, "base64").toString("binary");
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
    <html lang="en">
      <body className={roboto.className}>
        <ThemeRegistry>
          <DataProvider>
            <Main data={questions}>
              <Box sx={{ display: "flex" }}>
                <AppBar />
                <Box component="main" sx={{ mt: 10, width: "100%" }}>
                  {children}
                </Box>
              </Box>
            </Main>
          </DataProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
