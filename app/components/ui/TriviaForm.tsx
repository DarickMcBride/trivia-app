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

  const [state, formAction] = useFormState(submitAnswer, initialState);


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
      <Suspense fallback={<p>Loading question...</p>}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {questions[0] && questions[0].question}
        </Typography>
      </Suspense>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        component="form"
        action={formAction}
      >
        <input
          type="hidden"
          name="question-id"
          value={questions[0]?.id !== undefined ? questions[0]?.id : -1}
        />

        {!submitted && (
          <>
            <Suspense fallback={<p>Loading answers...</p>}>
              {questions[0] && <AnswerSelect answers={questions[0]?.answers} />}
            </Suspense>
            <FormButton text={"Submit"} />
          </>
        )}
        {submitted && (
          <>
            <Typography variant="h6">{state?.message}</Typography>
            <FormButton text={"Next Question"} onClick={handleNextQuestion} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default TriviaForm;
