import Link from "next/link";

import KeyboardArrowLeftIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { MyPage } from "$core/@types";

const IndexPage: MyPage = () => {
  return (
    <Container className="flex h-screen flex-col items-center bg-gray-100">
      <Box>
        <Typography
          className="mt-8 text-center font-bold lg:mt-20"
          component="h2"
          variant="h3"
        >
          Sign Up
        </Typography>
      </Box>
      <Paper
        className="mt-4 flex h-full w-full flex-col items-center justify-center space-y-8 lg:mt-10 lg:h-3/4 lg:w-1/3"
        elevation={3}
      >
        <Box className="flex w-3/5 flex-col items-center justify-center space-y-4 lg:space-y-8">
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
          />
          <Button className="w-full" color="primary" variant="outlined">
            Register
          </Button>
          <Typography component="p" variant="body1">
            or
          </Typography>
        </Box>
        <Box className="flex w-3/5 flex-col items-center justify-center space-y-4">
          <Link className="w-full" href="/signin">
            <Button className="w-full" color="primary" variant="outlined">
              Sign In
            </Button>
          </Link>
          <Button className="w-full" color="primary" variant="outlined">
            Log In with Google
          </Button>
        </Box>
        <Box className="flex w-full flex-col items-start space-y-4 px-6">
          <Link href="/">
            <Button startIcon={<KeyboardArrowLeftIcon />} variant="text">
              Home
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default IndexPage;
