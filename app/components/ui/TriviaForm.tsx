"use client";
import React, { useContext, useState } from "react";
import { Suspense } from "react";
import { Typography, Box } from "@mui/material";
import AnswerSelect from "./AnswerSelect";
import { FormButton } from "./FormButton";
import { useFormState } from "react-dom";
import { DataContext } from "@/app/providers";
import { submitAnswer } from "@/app/lib/actions";

const initialState = {
  message: "",
};

const TriviaForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useContext(DataContext);
  const [message, setMessage] = useState("");

  const submitAnswerAction = submitAnswer.bind(null, questions[0].id);
  const [state, formAction] = useFormState(submitAnswerAction, initialState);

  //handle next question button
  const handleNextQuestion = () => {
    const newQuestions = questions.slice(1);

    setQuestions(newQuestions);
    setSubmitted(false);
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
          {questions[0] && questions[0].question}
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
        {!submitted && (
          <>
            <Suspense fallback={<p>Loading answers...</p>}>
              {questions[0] && <AnswerSelect answers={questions[0].answers} />}
            </Suspense>
            <FormButton text={"Submit"} />
          </>
        )}
        {submitted && (
          <>
            <Typography variant="h6">{message}</Typography>
            <FormButton text={"Next Question"} onClick={handleNextQuestion} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default TriviaForm;
