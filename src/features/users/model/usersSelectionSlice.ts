import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UsersSelectionState } from "@/features/users/types/userApiTypes.ts";

const initialState: UsersSelectionState = {
  selectedIds: [],
};

export const usersSelectionSlice = createSlice({
  name: 'usersSelection',
  initialState,
  reducers: {
    setSelectedIds: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload;
    },
    clearSelectedIds: (state) => {
      state.selectedIds = [];
    },
  },
});

export const { setSelectedIds, clearSelectedIds } = usersSelectionSlice.actions;
export default usersSelectionSlice.reducer;
