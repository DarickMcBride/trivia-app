import { useFormStatus } from "react-dom";
import { Button } from "@mui/material";

export function NextButton({ onClick }: { onClick: () => void }) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      sx={{ mt: 2 }}
      type="reset"
      aria-disabled={pending}
      onClick={onClick}
    >
      Next Question
    </Button>
  );
}
