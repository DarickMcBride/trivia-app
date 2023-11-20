"use client";
import React, { ReactNode, useMemo, useContext, useEffect } from "react";
import { DataContext } from "../providers";

type Props = {
  children: ReactNode;
  data: any[];
  userID: string;
};

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

//get questions from api
const fetchQuestions = async () => {
  const res = await fetch("/api/questions", {
    method: "GET",
  });

  let data = await res.json();
  data = data.questions;

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

const DataFetch = ({ children }: any) => {
  const [questions, setQuestions] = useContext(DataContext);

  useEffect(() => {
    const getQuestions = async () => {
      console.log("fetching questions");
      let data = [];
      data = await fetchQuestions();
      if (data.length === 0) {
        //reset questions
        console.log("resetting questions");
        await fetch("http://localhost:3000/api/questions", {
          method: "PUT",
        });

        data = await fetchQuestions();
      }
      setQuestions(data);
    };

    const setUserID = async () => {
      await fetch("http://localhost:3000/api/cookies", {
        method: "GET",
      });

      if (questions.length === 0) {
        getQuestions();
      }
    };

    setUserID();
  }, [questions.length, setQuestions]);

  return <>{children}</>;
};

export default DataFetch;
