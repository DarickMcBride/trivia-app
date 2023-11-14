"use client";
import { styled } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
import { Container } from "@mui/material";

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 4,
  width: "100%",
});

const Input = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const TriviaForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission logic here
  };

  return (
    <Container maxWidth="sm">
      <Form onSubmit={handleSubmit}>
        <Input label="Question" variant="outlined" fullWidth required />
        <Input label="Answer" variant="outlined" fullWidth required />
        <SubmitButton variant="contained" sx={{ mt: 2 }} type="submit">
          Submit
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default TriviaForm;
