import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/shared/store/auth/authSlice.ts';
import { useLazyMeQuery } from '@/features/auth/api/authApi.ts';

export const AuthBootstrap = () => {
  const dispatch = useDispatch();
  const [ triggerMe ] = useLazyMeQuery();

  useEffect(() => {
    let alive = true;

    triggerMe()
      .unwrap()
      .then((data) => {
        if (!alive) return;
        if (data && data.ok === true) dispatch(setAuth(true));
        else dispatch(setAuth(false));
      })
      .catch(() => {
        if (!alive) return;
        dispatch(setAuth(false));
      });

    return () => {
      alive = false;
    };
  }, [dispatch, triggerMe]);

  return null;
};
