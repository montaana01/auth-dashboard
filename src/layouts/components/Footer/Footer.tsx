import { Container, Box, Typography } from "@mui/material";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        height: 80,
        bgcolor: "grey.900",
        color: "common.white",
        borderTop: 1,
        borderColor: "grey.800",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography variant="body2">
          © {year} Aliaksei Yakauleu
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          iTransition
        </Typography>
      </Container>
    </Box>
  )
}
