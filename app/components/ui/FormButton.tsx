"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@mui/material";

export function FormButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      sx={{ mt: 2, position: "relative", top: "30%" }}
      type={text === "Submit" ? "submit" : "reset"}
      aria-disabled={pending}
      onClick={text !== "Submit" ? onClick : undefined}
    >
      {text}
    </Button>
  );
}
