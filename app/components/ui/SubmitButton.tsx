"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@mui/material";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      sx={{ mt: 2 }}
      type="submit"
      aria-disabled={pending}
    >
      Submit
    </Button>
  );
}
