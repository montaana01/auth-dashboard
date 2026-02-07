import { Box, Chip, Typography } from '@mui/material';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 6 },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 'min(100%, 1040px)',
          borderRadius: 8,
          overflow: 'hidden',
          p: { xs: 2.5, md: 4 },
          boxShadow: '0 28px 70px rgba(8, 47, 73, 0.28)',
          background:
            'radial-gradient(150% 120% at 0% 0%, #164e63 0%, #0f172a 52%, #020617 100%)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 280,
            height: 280,
            borderRadius: '50%',
            top: -140,
            right: -80,
            bgcolor: 'rgba(245, 158, 11, 0.28)',
            filter: 'blur(10px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 340,
            height: 340,
            borderRadius: '50%',
            bottom: -180,
            left: -120,
            bgcolor: 'rgba(34, 197, 94, 0.2)',
            filter: 'blur(10px)',
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
            gap: { xs: 4, md: 2 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ color: '#ecfeff', px: { md: 2 } }}>
            <Chip
              label='Hi, there!'
              sx={{
                mb: 2.5,
                bgcolor: 'rgba(236, 254, 255, 0.16)',
                color: '#ccfbf1',
                border: '1px solid rgba(204, 251, 241, 0.35)',
              }}
            />
            <Typography
              variant='h3'
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.02em',
                fontSize: { xs: '2rem', md: '2.55rem' },
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              Auth Form
            </Typography>
            <Typography
              sx={{
                color: 'rgba(236, 254, 255, 0.82)',
                maxWidth: 460,
                mb: 3,
              }}
            >
              Default implementation of auth form for registration or login to user account
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: { xs: 'stretch', md: 'flex-end' } }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
