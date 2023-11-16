import TriviaForm from "@/app/components/ui/TriviaForm";
import { Container } from "@mui/material";



export default async function Page() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TriviaForm />
    </Container>
  );
}
