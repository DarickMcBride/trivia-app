"use client";
import React, { ReactNode, useContext, useEffect } from "react";
import { DataContext } from "../lib/providers";

type Props = {
  children: ReactNode;
  data: any[];
};

const DataFetch: React.FC<Props> = ({ children, data }) => {
  const [_, setQuestions] = useContext(DataContext);

  //store questions in context
  useEffect(() => {
    if (data.length > 0) {
      setQuestions(data);
    }
  }, [data, setQuestions]);
  return <>{children}</>;
};

export default DataFetch;
