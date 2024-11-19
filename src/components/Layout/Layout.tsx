import NavBar from "../NavBar/NavBar.tsx";
import { Container } from "@mui/material";

import React, { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Container maxWidth="lg">{children}</Container>
    </>
  );
};

export default Layout;
