import React, { FC, useState } from "react";

import Link from "next/link";

import KeyboardArrowLeftIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import { SignUpType } from "$core/api";
import { useAppContext } from "$core/contexts";

export const SignUp: FC = () => {
  const appContext = useAppContext();
  const { signup } = appContext;
  const [data, setData] = useState<SignUpType>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };
  return (
    <>
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
            name="username"
            value={data.username}
            variant="outlined"
            onChange={(e) => handleChange("username", e.target.value)}
          />
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Email"
            name="email"
            value={data.email}
            variant="outlined"
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Password"
            name="password"
            value={data.password}
            variant="outlined"
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Confirm Password"
            name="passwordConfirm"
            value={data.passwordConfirm}
            variant="outlined"
            onChange={(e) => handleChange("passwordConfirm", e.target.value)}
          />
          <Button
            className="w-full"
            color="primary"
            variant="outlined"
            onClick={() => signup(data)}
          >
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
    </>
  );
};
