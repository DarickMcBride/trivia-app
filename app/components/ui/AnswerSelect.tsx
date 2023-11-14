import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface AnswerSelectProps {
  answers: string[];
}

export default function AnswerSelect({ answers }: AnswerSelectProps) {
  const [value, setValue] = React.useState("a");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <FormLabel id="answer-select">Choose an answer below</FormLabel>
      <RadioGroup
        row
        aria-labelledby="answer-select"
        name="answer-select"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={answers[0]}
          control={<Radio />}
          label={`A: ${answers[0]}`}
        />
        <FormControlLabel
          value={answers[1]}
          control={<Radio />}
          label={`B: ${answers[1]}`}
        />
        <FormControlLabel
          value={answers[2]}
          control={<Radio />}
          label={`C: ${answers[2]}`}
        />
        <FormControlLabel
          value={answers[4]}
          control={<Radio />}
          label={`D: ${answers[3]}`}
        />
      </RadioGroup>
    </FormControl>
  );
}
