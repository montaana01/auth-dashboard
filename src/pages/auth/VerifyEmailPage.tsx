import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ROUTES } from '@/app/config/routes.ts';
import { useVerifyEmailQuery } from '@/features/auth/api/authApi.ts';

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const token = useMemo(() => {
    const t = params.get('token');
    return typeof t === 'string' ? t : '';
  }, [params]);

  const { data, isFetching, isError } = useVerifyEmailQuery({ token }, { skip: token.length === 0 });

  const ok = data && 'ok' in data && data.ok === true;
  const status: 'loading' | 'success' | 'error' = useMemo(() => {
    if (isFetching) return 'loading';
    if (ok) return 'success';
    return 'error';
  }, [isFetching, ok]);

  const message = (() => {
    if (!token) return 'Verification token is missing.';
    if (isFetching) return 'Verifying your email…';
    if (ok) return data.message || 'Email has been verified successfully.';
    if (data && 'ok' in data && data.ok === false) return data.message;
    if (isError) return 'Email verification failed.';
    return '';
  })();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 430,
        bgcolor: 'rgba(255, 255, 255, 0.96)',
        border: '1px solid rgba(15, 23, 42, 0.12)',
        borderRadius: 5,
        mt: 5,
        p: { xs: 2.5, md: 3.5 },
        backdropFilter: 'blur(6px)',
        boxShadow: '0 18px 42px rgba(15, 23, 42, 0.14)',
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <MarkEmailReadRoundedIcon sx={{ color: '#0f766e' }} />
          <Typography
            variant='h5'
            sx={{ fontWeight: 800, letterSpacing: '-0.015em', color: '#0f172a' }}
          >
            Verify email
          </Typography>
        </Box>

        <Typography variant='body2' sx={{ color: 'rgba(15, 23, 42, 0.72)' }}>
          We are validating your confirmation link.
        </Typography>

        <Box
          sx={{
            borderRadius: 2.5,
            p: 1.5,
            bgcolor: status === 'success'
              ? 'rgba(22, 163, 74, 0.12)'
              : status === 'loading'
                ? 'rgba(14, 116, 144, 0.12)'
                : 'rgba(239, 68, 68, 0.10)',
            border: status === 'success'
              ? '1px solid rgba(22, 163, 74, 0.24)'
              : status === 'loading'
                ? '1px solid rgba(14, 116, 144, 0.24)'
                : '1px solid rgba(239, 68, 68, 0.22)',
          }}
        >
          <Stack direction='row' spacing={1.2} sx={{ alignItems: 'center' }}>
            {status === 'loading' && <CircularProgress size={18} />}
            {status === 'success' && <CheckCircleRoundedIcon color='success' fontSize='small' />}
            {status === 'error' && <ErrorOutlineRoundedIcon color='error' fontSize='small' />}
            <Typography variant='body2' sx={{ color: '#0f172a' }}>
              {message}
            </Typography>
          </Stack>
        </Box>

        <Divider />

        <Stack direction='row' spacing={1}>
          <Button
            variant='contained'
            onClick={() => navigate(ROUTES.SIGN_IN)}
            disabled={isFetching}
            sx={{
              borderRadius: 2.5,
              textTransform: 'none',
              fontWeight: 700,
              background: 'linear-gradient(120deg, #0f766e 0%, #0891b2 48%, #ea580c 100%)',
            }}
          >
            Go to sign in
          </Button>
          <Button
            variant='text'
            onClick={() => navigate(ROUTES.SIGN_UP)}
            disabled={isFetching}
            sx={{ textTransform: 'none', fontWeight: 700, color: '#0f766e' }}
          >
            Back to sign up
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
