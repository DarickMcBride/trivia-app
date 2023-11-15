"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@mui/material";

export function SubmitButton({ onClick }: { onClick: () => void }) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      sx={{ mt: 2 }}
      type="submit"
      aria-disabled={pending}
      onClick={onClick}
    >
      Submit
    </Button>
  );
}
