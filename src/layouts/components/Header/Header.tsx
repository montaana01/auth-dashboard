import { AppBar, Toolbar, Container, Typography, Box, Button, Grid, Stack } from "@mui/material";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store.ts";
import { ROUTES } from "@/app/config/routes.ts";
import { setAuth } from "@/shared/store/auth/authSlice.ts";
import { useLogoutMutation } from "@/features/auth/api/authApi.ts";

const buttonSx = {
  textTransform: "uppercase",
  fontWeight: 700,
  borderRadius: 1.5,
  px: 1.25,
  "&.active": { bgcolor: "rgba(236,254,255,0.18)" },
  "&:hover": { bgcolor: "rgba(236,254,255,0.13)" },
};

export const Header = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    await logoutApi().unwrap();
    dispatch(setAuth(false));
  };

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
        position: "relative",
        overflow: "hidden",
        color: "#ecfeff",
        borderBottom: "1px solid rgba(204,251,241,0.22)",
        background: "radial-gradient(150% 120% at 0% 0%, #164e63 0%, #0f172a 52%, #020617 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          top: -130,
          right: -80,
          bgcolor: "rgba(245, 158, 11, 0.25)",
          filter: "blur(10px)",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          bottom: -120,
          left: 90,
          bgcolor: "rgba(34, 197, 94, 0.16)",
          filter: "blur(10px)",
          pointerEvents: "none",
        },
      }}
    >
      <Toolbar
        sx={{
          height: 80,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container>
          <Box>
            <Grid container justifyContent="space-between">
              <Typography
                variant="h6"
                component="h2"
                sx={{ m: 0, whiteSpace: "nowrap", fontWeight: 800, letterSpacing: "-0.01em" }}
              >
                Auth Dashboard
              </Typography>
              <Grid container alignItems="center">
                <Box>
                  <Stack direction="row" spacing={1}>
                    {isAuth ? (
                      <Button onClick={handleLogout} color="inherit">
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
  );
};
