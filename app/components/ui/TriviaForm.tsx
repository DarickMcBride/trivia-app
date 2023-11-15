"use client";
import React, { useState, createContext, useEffect } from "react";
import { Suspense } from "react";
import { Typography, Box } from "@mui/material";
import AnswerSelect from "./AnswerSelect";
import { SubmitButton } from "./SubmitButton";
import { NextButton } from "./NextButton";
import { submitAnswer } from "@/app/lib/actions";
import { useFormState } from "react-dom";

type Question = {
  id: number;
  question: string;
  answers: string[];
};

const QuestionsContext = createContext<Question[]>([]);

interface TriviaFormProps {
  questionList: Question[];
}

const TriviaForm = ({ questionList }: TriviaFormProps) => {
  const [questions, setQuestions] = useState([] as Question[]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const cachedQuestions = localStorage.getItem("questions");
    console.log("questionList", questionList);
    console.log("cashed questions", cachedQuestions);
    if (cachedQuestions?.length && cachedQuestions.length > 0) {
      console.log(cachedQuestions.length);
      setQuestions(JSON.parse(cachedQuestions));
    } else {
      console.log("inital questions");
      setQuestions(questionList);
    }
  }, [questionList]);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const updateQuestionList = submitAnswer.bind(null, questions[0]?.id);
  const [state, formAction] = useFormState(updateQuestionList, null);

  //handle next question button
  const handleNextQuestion = () => {
    const newQuestions = questions.slice(1);

    setQuestions(newQuestions);
    setSubmitted(false);
  };
  console.log("questions", questions);

  return (
    <QuestionsContext.Provider value={questions}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        {questions.length > 0 && (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
              <Suspense fallback={<p>Loading question...</p>}>
                {questions[0].question}
              </Suspense>
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              component="form"
              action={formAction}
            >
              <Suspense fallback={<p>Loading answers...</p>}>
              <AnswerSelect answers={questions[0].answers} />
              </Suspense>
            <Typography variant="h6">{state?.message}</Typography>
              {!state?.submitted && <SubmitButton />}
              {state?.submitted && <NextButton onClick={handleNextQuestion} />}
            </Box>
          </>
      )}
    </Box>
    </QuestionsContext.Provider>
  );
};

export default TriviaForm;
