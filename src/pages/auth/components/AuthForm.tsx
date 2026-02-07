import type { AuthFormProps } from '@/app/types/AuthFormTypes.ts';
import type { RootState } from '@/app/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { login, setAuth } from '@/shared/store/auth/authSlice.ts';
import { ROUTES } from '@/app/config/routes.ts';
import { useSignInMutation, useSignUpMutation } from '@/features/auth/api/authApi.ts';
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { useSnackbar } from 'notistack';

function validateEmail(email: string): boolean {
  return email.trim().length > 0 && email.includes('@');
}

export const AuthForm = ({type}: AuthFormProps) => {
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [signIn, signInState] = useSignInMutation();
  const [signUp, signUpState] = useSignUpMutation();

  const isLoading = signInState.isLoading || signUpState.isLoading;

  const title = useMemo(() => {
    if (type === 'login') return 'Welcome back';
    if (type === 'register') return 'Create account';
    return 'Auth';
  }, [type]);

  useEffect(() => {
    if (isAuth) navigate(ROUTES.USERS, { replace: true });
  }, [isAuth, navigate]);

  if (!type) {
    return (
      <Typography variant="h6">Form type is not provided to Auth Form</Typography>
    );
  }

  const onSubmit = async () => {
    const e = email.trim().toLowerCase();

    if (!validateEmail(e) || password.length === 0) {
      enqueueSnackbar('Please enter a valid email and a non-empty password', { variant: 'error' });
      return;
    }

    if (type === 'login') {
      const resp = await signIn({ email: e, password }).unwrap();
      if (resp.ok) {
        dispatch(login());
        enqueueSnackbar(resp.message || 'Signed in', { variant: 'success' });
        navigate(ROUTES.USERS, { replace: true });
      } else {
        dispatch(setAuth(false));
        enqueueSnackbar(resp.message || 'Sign in failed', { variant: 'error' });
      }
      return;
    }

    if (type === 'register') {
      const resp = await signUp({ email: e, password }).unwrap();
      if (resp.ok) {
        enqueueSnackbar(resp.message || 'Registered', { variant: 'success' });
        navigate(ROUTES.SIGN_IN, { replace: true });
      } else {
        enqueueSnackbar(resp.message || 'Registration failed', { variant: 'error' });
      }
    }
  };

  return (
    <Box
      component='form'
      onSubmit={(event) => {
        event.preventDefault();
        if (!isLoading) void onSubmit();
      }}
      sx={{
        width: '100%',
        maxWidth: 430,
        bgcolor: 'rgba(255, 255, 255, 0.94)',
        border: '1px solid rgba(15, 23, 42, 0.12)',
        borderRadius: 5,
        p: { xs: 2.5, md: 3.5 },
        backdropFilter: 'blur(6px)',
      }}
    >
      <Typography
        variant='h4'
        sx={{
          mb: 0.8,
          fontWeight: 800,
          fontSize: { xs: '1.8rem', md: '2.1rem' },
          letterSpacing: '-0.02em',
          color: '#0f172a',
        }}
      >
        {title}
      </Typography>

      <Stack spacing={2}>
        <TextField
          label='Email'
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete='email'
          fullWidth
          disabled={isLoading}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2.5,
              bgcolor: 'rgba(241, 245, 249, 0.75)',
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <AlternateEmailRoundedIcon sx={{ color: '#0f766e', fontSize: '1.1rem' }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label='Password'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete={type === 'login' ? 'current-password' : 'new-password'}
          fullWidth
          disabled={isLoading}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2.5,
              bgcolor: 'rgba(241, 245, 249, 0.75)',
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <LockOpenRoundedIcon sx={{ color: '#0f766e', fontSize: '1.1rem' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <Button
                    size='small'
                    variant='text'
                    onClick={() => setShowPassword((prev) => !prev)}
                    sx={{ minWidth: 0, px: 1.2, color: '#0f766e' }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          variant='contained'
          type='submit'
          disabled={isLoading}
          sx={{
            mt: 0.3,
            borderRadius: 2.5,
            py: 1.25,
            fontWeight: 700,
            textTransform: 'none',
            background: 'linear-gradient(120deg, #0f766e 0%, #0891b2 48%, #ea580c 100%)',
          }}
        >
          {type === 'login' ? 'Sign in' : 'Sign up'}
        </Button>

        <Divider sx={{ my: 0.6 }}>or</Divider>

        {type === 'login' && (
          <Button
            variant='text'
            onClick={() => navigate(ROUTES.SIGN_UP)}
            disabled={isLoading}
            sx={{ textTransform: 'none', fontWeight: 700, color: '#0f766e' }}
          >
            Need an account? Sign up
          </Button>
        )}
        {type === 'register' && (
          <Button
            variant='text'
            onClick={() => navigate(ROUTES.SIGN_IN)}
            disabled={isLoading}
            sx={{ textTransform: 'none', fontWeight: 700, color: '#0f766e' }}
          >
            Already have an account? Sign in
          </Button>
        )}
      </Stack>
    </Box>
  );
};
