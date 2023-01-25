import { useEffect } from "react";

import Link from "next/link";

import { Box, Button, Container, Paper, Typography } from "@mui/material";

import { MyPage } from "$core/@types";
import { useAppContext } from "$core/contexts";

const IndexPage: MyPage = () => {
  const appContext = useAppContext();
  const { auth, getuser, logout } = appContext;
  useEffect(() => {
    getuser();
  }, []);

  return (
    <Container className="flex h-screen flex-col items-center bg-gray-100">
      <Box>
        <Typography
          className="mt-20 text-center font-bold"
          component="h2"
          variant="h3"
        >
          REST Template
        </Typography>
      </Box>
      {auth !== undefined ? (
        <Paper
          className="mt-10 flex h-1/2 w-3/4 flex-col items-center justify-center space-y-8 p-16 lg:h-1/3 lg:w-1/3"
          elevation={3}
        >
          {auth.email}
          <Button
            className="w-full"
            color="primary"
            variant="outlined"
            onClick={() => logout()}
          >
            Log Out
          </Button>
        </Paper>
      ) : (
        <Paper
          className="mt-10 flex h-1/2 w-3/4 flex-col items-center justify-center space-y-8 p-16 lg:h-1/3 lg:w-1/3"
          elevation={3}
        >
          <Link className="w-full" href="/signup">
            <Button className="w-full" color="primary" variant="outlined">
              Sign Up
            </Button>
          </Link>
          <Link className="w-full" href="/signin">
            <Button className="w-full" color="primary" variant="outlined">
              Log In
            </Button>
          </Link>
        </Paper>
      )}
    </Container>
  );
};

export default IndexPage;
