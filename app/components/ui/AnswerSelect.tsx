import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ControlledRadioButtonsGroup() {
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
        <FormControlLabel value="a" control={<Radio />} label="a" />
        <FormControlLabel value="b" control={<Radio />} label="b" />
        <FormControlLabel value="c" control={<Radio />} label="c" />
        <FormControlLabel value="d" control={<Radio />} label="d" />
      </RadioGroup>
    </FormControl>
  );
}
