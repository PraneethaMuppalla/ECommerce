import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("adminToken");

const initialState = {
  loggedIn: !!initialToken,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
