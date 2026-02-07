import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/shared/store/auth/authSlice.ts';
import { baseApi } from '@/shared/api/baseApi.ts';
import usersSelectionReducer from '@/features/users/model/usersSelectionSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    usersSelection: usersSelectionReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
