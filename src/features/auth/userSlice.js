import { createSlice } from "@reduxjs/toolkit";
import { addUserToLocal, getUserFromLocal, removeUserFromLocal } from "../shared/local";


export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: getUserFromLocal()
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      addUserToLocal(state.user);
    },
    removeUser: (state, action) => {
      state.user = null;

      removeUserFromLocal();

    }
  }
});

export const { addUser, removeUser } = userSlice.actions;

