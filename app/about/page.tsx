import Box from "@mui/material/Box";

const AboutPage = () => {
  return (
    <Box sx={{ ml: 5 }}>
      <h1>About Me</h1>
      <p>
        Welcome to my trivia app! I am a passionate developers who love creating
        fun and engaging experiences for my users.
      </p>
      <p>
        My goal is to provide a platform for people to test their knowledge and
        have fun while doing it. I hope you enjoy using my app as much as I
        enjoyed building it!
      </p>
      <br />
      <p>Thank you,</p>
      <p>Darick McBride</p>

      <h2>Planned Features</h2>
      <ul>
        <li>Custom theming</li>
        <li>Dark and light mode</li>
        <li>Settings</li>
        <li>Ability to choose questions difficulty and category</li>
        <li>Feedback submission</li>
        <li>Ability to do more than 50 questions</li>
        <li>Keep track of questions already asked by user</li>
        <li>Score keeping</li>
      </ul>
      <p>
        <strong>Disclaimer:</strong> This is a pre-release version. Some
        features may not work as expected.
      </p>
    </Box>
  );
};

export default AboutPage;
