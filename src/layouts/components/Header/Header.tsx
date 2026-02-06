import {Box, Button, Grid, Stack} from "@mui/material";
import {NavLink} from "react-router";
import {ROUTES} from "@/app/config/routes.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "@/app/store.ts";
import {logout} from "@/shared/store/auth/authSlice.ts";


const EXCLUDED = new Set(["NOT_FOUND", "AUTH"]);

const NAV_LINKS = Object.entries(ROUTES)
  .filter(([key]) => !EXCLUDED.has(key))
  .map(([key, value]) => ({
    id: key,
    to: value,
    label: key.toLowerCase().replaceAll("_", " "),
  }));

export const Header = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const dispatch = useDispatch()

  return (
    <Box component="header" sx={{mb: 2}}>
      <Grid container justifyContent="space-between">
        <h2>Header</h2>
        <Grid container alignItems="center">
          <Box>
            {isAuth ? (
              <Button onClick={() => dispatch(logout())} color="inherit">
                Logout
              </Button>
            ) : (
              <Button component={NavLink} to={ROUTES.SIGN_IN} color="inherit">
                Login
              </Button>
            )}
          </Box>
          <Stack direction="row" spacing={1}>
            {NAV_LINKS.map((item) => (
              <Button
                key={item.id}
                component={NavLink}
                to={item.to}
                color="inherit"
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
