import { Container } from "@mui/material";

import { MyPage } from "$core/@types";
import { SignUp } from "$modules/SignUp";

const IndexPage: MyPage = () => {
  return (
    <Container className="flex h-screen flex-col items-center bg-gray-100">
      <SignUp />
    </Container>
  );
};

export default IndexPage;
