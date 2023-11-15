"use client";
import React, { useContext, useEffect, useState } from "react";
import { Suspense } from "react";
import { Typography, Box } from "@mui/material";
import AnswerSelect from "./AnswerSelect";
import { SubmitButton } from "./SubmitButton";
import { NextButton } from "./NextButton";
import { submitAnswer } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { DataContext } from "@/app/lib/providers";

type Question = {
  id: number;
  question: string;
  answers: string[];
};

interface TriviaFormProps {
  data: Question[];
}

const TriviaForm = ({ data }: TriviaFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useContext(DataContext);

  //store questions in context
  useEffect(() => {
    if (data.length > 0) {
      setQuestions(data);
    }
  }, [data, setQuestions]);

  const updateQuestionList = submitAnswer.bind(null, questions[0]?.id);
  const [state, formAction] = useFormState(updateQuestionList, null);

  useEffect(() => {
    if (state?.message) {
      setSubmitted(true);
    }
  }, [state?.message]);

  //handle next question button
  const handleNextQuestion = () => {
    const newQuestions = questions.slice(1);

    setQuestions(newQuestions);
    setSubmitted(false);
  };

  console.log("num of questions", questions.length);

  return (
    <Suspense fallback={<p>Loading question...</p>}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          {questions[0] && questions[0].question}
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
          {questions[0] && <AnswerSelect answers={questions[0].answers} />}
          <Typography variant="h6">{state?.message}</Typography>
          {!submitted && <SubmitButton />}
          {submitted && <NextButton onClick={handleNextQuestion} />}
        </Box>
      </Box>
    </Suspense>
  );
};

export default TriviaForm;
