import { Container } from "@mui/material";

import { MyPage } from "$core/@types";
import { SignIn } from "$modules/SignIn";

const IndexPage: MyPage = () => {
  return (
    <Container className="flex h-screen flex-col items-center bg-gray-100">
      <SignIn />
    </Container>
  );
};

export default IndexPage;
