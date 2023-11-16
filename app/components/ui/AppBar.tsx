import { AppBar, Box, Toolbar, Button, Typography } from "@mui/material";
import Link from "next/link";
import QuizIcon from "@mui/icons-material/Quiz";
import IconButton from "@mui/material/IconButton";

const navItems = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
];

const MyAppBar = () => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <IconButton>
              <QuizIcon />
            </IconButton>
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            component={Link}
            href={"/"}
            sx={{ color: "white", fontSize: 25 }}
          >
            Trivia Time
          </Button>
        </Box>

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
  );
};

export default MyAppBar;
