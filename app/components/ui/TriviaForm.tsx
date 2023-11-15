"use client";
import React, { useState } from "react";
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

interface TriviaFormProps {
  questionList: Question[];
}

const TriviaForm = ({ questionList }: TriviaFormProps) => {
  const [questions, setQuestions] = useState(questionList);
  const [submitted, setSubmitted] = useState(false);

  const updateQuestionList = submitAnswer.bind(null, questions[0].id);
  const [message, formAction] = useFormState(updateQuestionList, null);

  //handle next question button
  const handleNextQuestion = () => {
    const newQuestions = questions.slice(1);
    setQuestions(newQuestions);
    setSubmitted(false);
  };

  //handle submit button
  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
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
        <AnswerSelect answers={questions[0].answers} />
        <Typography variant="h6">{message}</Typography>
        {!submitted && <SubmitButton onClick={handleSubmit} />}
        {submitted && <NextButton onClick={handleNextQuestion} />}
      </Box>
    </Box>
  );
};

export default TriviaForm;
