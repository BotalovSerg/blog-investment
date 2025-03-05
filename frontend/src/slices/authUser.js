import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthUser: false,
  currentUser: null,
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      console.log(action.payload);
      state.isAuthUser = true;
      state.currentUser = {
        first: "Sergey",
        last: "Botalov",
        avatar: "https://robohash.org/you.png?size=200x200",
        bio: "Info",
        notes: "Some notes",
      };
    },
    userLogout: (state, action) => {
      state.isAuthUser = false;
      state.currentUser = null;
    },
    createUser: (state, action) => {
      const newUser = action.payload;
      console.log(action.payload);
      state.currentUser = newUser;
    },
  },
});

export const { userLogin, userLogout } = authUserSlice.actions;

export default authUserSlice.reducer;
