"use client";

import React, { useState, createContext } from "react";

type Question = {
  id: number;
  question: string;
  answers: string[];
};

type DataType = [Question[], React.Dispatch<React.SetStateAction<Question[]>>];

export const DataContext = createContext<DataType>([[], () => {}]);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  return (
    <DataContext.Provider value={[questions, setQuestions]}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
