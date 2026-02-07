import { Container, Box, Typography, Link } from "@mui/material";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        overflow: "hidden",
        height: 80,
        color: "#ecfeff",
        borderTop: "1px solid rgba(204,251,241,0.22)",
        background: "radial-gradient(150% 120% at 0% 0%, #164e63 0%, #0f172a 52%, #020617 100%)",
        display: "flex",
        alignItems: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          width: 190,
          height: 190,
          borderRadius: "50%",
          left: -90,
          top: -110,
          bgcolor: "rgba(34, 197, 94, 0.16)",
          filter: "blur(10px)",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          right: -100,
          bottom: -120,
          bgcolor: "rgba(245, 158, 11, 0.2)",
          filter: "blur(10px)",
          pointerEvents: "none",
        },
      }}
    >
      <Container
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Link
          href="https://github.com/montaana01"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="inherit"
          sx={{ opacity: 0.95, fontWeight: 600 }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            © {year} Aliaksei Yakauleu
          </Typography>
        </Link>
        <Link
          href="https://www.itransition.com"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="inherit"
          sx={{ opacity: 0.95, fontWeight: 600 }}
        >
          iTransition
        </Link>
      </Container>
    </Box>
  )
}
