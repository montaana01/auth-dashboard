import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuth: boolean
  email: string | null
}

const initialState: AuthState = {
  isAuth: false,
  email: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
      if (!action.payload) {
        state.email = null
      }
    },
    setUserEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload
    },
    login: (state, action: PayloadAction<string | undefined>) => {
      state.isAuth = true
      if (action.payload !== undefined) {
        state.email = action.payload
      }
    },
    logout: (state) => {
      state.isAuth = false
      state.email = null
    },
  },
})

export const { setAuth, setUserEmail, login, logout } = authSlice.actions
export default authSlice.reducer
