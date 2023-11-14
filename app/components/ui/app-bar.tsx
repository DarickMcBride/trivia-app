import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import Link from "next/link";
import QuizIcon from "@mui/icons-material/Quiz";

const navItems = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
];

const MyAppBar = (props: { children: any }) => {
  const { children } = props;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar component="nav">
        <Toolbar>
          <Link href="/">
            <QuizIcon sx={{ mr: 2 }} />
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trivia Time
          </Typography>

          <Box
            sx={{
              display: { sm: "block" },
              marginLeft: "auto",
            }}
          >
            <Button component={Link} href={"/about"} sx={{ color: "white" }}>
              About
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ mt: 10 }}>
        {children}
      </Box>
    </Box>
  );
};

export default MyAppBar;
