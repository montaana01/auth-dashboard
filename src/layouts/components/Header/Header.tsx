import { AppBar, Toolbar, Container, Typography, Box, Button, Grid, Stack } from "@mui/material";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store.ts";
import { ROUTES } from "@/app/config/routes.ts";
import { logout } from "@/shared/store/auth/authSlice.ts";

const buttonSx = {
  textTransform: "uppercase",
  borderRadius: 1.5,
  px: 1.25,
  "&.active": {bgcolor: "rgba(255,255,255,0.14)"},
  "&:hover": {bgcolor: "rgba(255,255,255,0.10)"}
};

export const Header = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const dispatch = useDispatch()

  const NAV_LINKS = isAuth
    ? [
      { id: "USERS", to: ROUTES.USERS, label: "users" },
      { id: "ABOUT", to: ROUTES.ABOUT, label: "about" },
    ]
    : [{ id: "ABOUT", to: ROUTES.ABOUT, label: "about" }];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        color: "common.white",
        borderBottom: 1,
        borderColor: "grey.800",
        bgcolor: "grey.900",
      }}
    >
      <Toolbar
        sx={{
          height: 80,
        }}
      >
        <Container>
          <Box>
            <Grid container justifyContent="space-between">
              <Typography variant="h6" component="h2" sx={{ m: 0, whiteSpace: "nowrap" }}>
                Auth Dashboard
              </Typography>
              <Grid container alignItems="center">
                <Box>
                  <Stack direction="row" spacing={1}>
                    {isAuth ? (
                      <Button onClick={() => dispatch(logout())} color="inherit">
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Button component={NavLink} to={ROUTES.SIGN_IN} color="inherit" sx={buttonSx}>
                          Login
                        </Button>
                        <Button component={NavLink} to={ROUTES.SIGN_UP} color="inherit" sx={buttonSx}>
                          Sign up
                        </Button>
                      </>
                    )}
                  </Stack>
                </Box>
                <Stack direction="row" spacing={1}>
                  {NAV_LINKS.map((item) => (
                    <Button
                      key={item.id}
                      component={NavLink}
                      to={item.to}
                      color="inherit"
                      sx={buttonSx}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
