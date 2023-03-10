import React, { FC, useState } from "react";

import Link from "next/link";

import KeyboardArrowLeftIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import { SignInType } from "$core/api";
import { useAppContext } from "$core/contexts";

export const SignIn: FC = () => {
  const appContext = useAppContext();
  const { signin } = appContext;
  const [data, setData] = useState<SignInType>({ email: "", password: "" });
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
          Sign In
        </Typography>
      </Box>
      <Paper
        className="mt-4 flex h-4/5 w-full flex-col items-center justify-center space-y-8 lg:mt-10 lg:h-3/5 lg:w-1/3"
        elevation={3}
      >
        <Box className="flex w-3/5 flex-col items-center justify-center space-y-8">
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
          <Button
            className="w-full"
            color="primary"
            variant="outlined"
            onClick={() => signin(data)}
          >
            Log In
          </Button>
          <Typography component="p" variant="body1">
            or
          </Typography>
        </Box>
        <Box className="flex w-3/5 flex-col items-center justify-center space-y-4">
          <Link className="w-full" href="/signup">
            <Button className="w-full" color="primary" variant="outlined">
              Sign Up
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
