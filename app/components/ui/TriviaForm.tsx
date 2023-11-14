"use client";
import { Suspense } from "react";
import { Typography, Box } from "@mui/material";
import AnswerSelect from "./AnswerSelect";
import { SubmitButton } from "./SubmitButton";

interface TriviaFormProps {
  question: string;
  answers: string[];
}

const TriviaForm: React.FC<TriviaFormProps> = ({ question, answers }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission logic here
  };

  return (
    <Box
      component={"form"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        <Suspense fallback={<p>Loading question...</p>}>{question}</Suspense>
      </Typography>
      <AnswerSelect answers={answers} />
      <SubmitButton />
    </Box>
  );
};

export default TriviaForm;
