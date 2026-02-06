import { Outlet } from 'react-router';
import {Header} from "@/layouts/components/Header/Header.tsx";
import {Box} from "@mui/material";
import {Footer} from "@/layouts/components/Footer/Footer.tsx";

export const Layout = () => {
  return (
    <>
      <Header />
      <Box
        component="main"
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}
